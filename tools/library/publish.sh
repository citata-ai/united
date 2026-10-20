#!/bin/bash
# Publish the next library drafts on the schedule in schedule.toml (docs/content-library.md).
# launchd runs it at 06:00, 14:00 and 22:00. Flow: make N drafts visible on stage -> test + build ->
# push stage -> wait for the stage deploy -> check 200 -> merge stage into main -> wait -> check 200.
# Allowed by the publish rule in docs/growth-loop.md. On any failure it stops; the night check fixes it.
JOB=publish
source "$(dirname "$0")/common.sh"
lock
sync_stage
n=$(python3 tools/library/library.py run-count)
[ "$n" -gt 0 ] || { log "nothing to publish in this slot"; exit 0; }
out=$(cd landing && node scripts/publish-library.mjs "$n")
slugs=$(echo "$out" | sed -n 's#^published /guides/##p')
[ -n "$slugs" ] || { log "no draft with a cover; $out"; git push -q origin stage; exit 0; }
k=$(echo "$slugs" | wc -l | tr -d ' ')
fail() { log "FAIL: $*"; git checkout -- landing/src/content/library; exit 1; }
bunx vitest run landing/library.test.ts landing/guide-covers.test.ts >/dev/null 2>&1 || fail "tests"
(cd landing && bun run build >/dev/null 2>&1) || fail "build"
for s in $slugs; do [ -f "landing/dist/guides/$s.html" ] || fail "not built: $s"; done
for s in $slugs; do printf '%s\t%s\n' "$(date +%F)" "$s" >> business/marketing/content-plan/publish-log.tsv; done
git add landing/src/content/library business/marketing/content-plan/publish-log.tsv
git commit -qm "library: publish $k ($(echo $slugs | tr ' ' ','))" || fail "commit"

deploy_ok() { # $1 branch, $2 sha: wait for the deploy run of that commit
  for _ in $(seq 1 30); do
    id=$(gh run list --branch "$1" --workflow deploy.yml --commit "$2" --json databaseId -q '.[0].databaseId' 2>/dev/null)
    [ -n "$id" ] && break; sleep 20
  done
  [ -n "$id" ] && timeout 1800 gh run watch "$id" --exit-status >/dev/null 2>&1
}
check_200() { # $1 site
  for s in $slugs; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "$1/guides/$s")
    [ "$code" = 200 ] || { log "$1/guides/$s gave $code"; return 1; }
  done
}
git push -q origin stage || { git pull -q --no-rebase origin stage && git push -q origin stage; } || { log "push stage failed"; exit 1; }
deploy_ok stage "$(git rev-parse HEAD)" || { log "stage deploy failed, main not touched"; exit 1; }
check_200 https://stage.citata.ai || exit 1
log "stage ok: $k pages"

git checkout -q main && git pull -q --no-rebase origin main || { git checkout -q stage; log "main sync failed"; exit 1; }
git merge -q --no-ff stage -m "publish: stage → main (library: $k articles)" || { git merge --abort; git checkout -q stage; log "merge failed"; exit 1; }
git push -q origin main || { git checkout -q stage; log "push main failed"; exit 1; }
sha=$(git rev-parse HEAD); git checkout -q stage
deploy_ok main "$sha" || { log "prod deploy failed"; exit 1; }
check_200 https://citata.ai || exit 1
for u in / /property-management /case-studies/fridman-properties; do
  [ "$(curl -s -o /dev/null -w '%{http_code}' "https://citata.ai$u")" = 200 ] || log "smoke: $u not 200"
done
log "LIVE $k: $(echo $slugs | tr '\n' ' ')"
