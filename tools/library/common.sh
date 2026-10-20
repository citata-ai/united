# Shared setup for tools/library/*.sh. Runs from launchd: no login shell, so set PATH here.
export PATH="/Users/admin/.local/share/mise/shims:/Users/admin/.local/share/mise/installs/bun/latest/bin:/opt/homebrew/bin:/Users/admin/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
REPO=${CITATA_PUBLISHER:-/Users/admin/.t3/worktrees/citata.ai/library-publisher}
LOGDIR="$HOME/Library/Logs/citata-library"
mkdir -p "$LOGDIR"
cd "$REPO" || exit 1
log() { echo "$(date '+%F %T') [$JOB] $*"; }
# One job at a time in the publisher worktree (macOS has no flock).
LOCK=/tmp/citata-library.lock
lock() {
  for _ in $(seq 1 120); do mkdir "$LOCK" 2>/dev/null && { trap 'rmdir "$LOCK"' EXIT; return 0; }; sleep 30; done
  log "lock busy for 60 min, give up"; exit 1
}
# Start from the latest stage. Never reset: a dirty tree means a past run failed; the night check fixes it.
sync_stage() {
  [ "$(git branch --show-current)" = stage ] || { log "not on stage"; exit 1; }
  [ -z "$(git status --porcelain --untracked-files=no)" ] || { log "dirty tree, stop"; exit 1; }
  git pull -q --no-rebase origin stage || { log "pull failed"; exit 1; }
}
