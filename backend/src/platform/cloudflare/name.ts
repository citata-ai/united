/**
 * Physical Worker name for a stage. Prod keeps the plain name
 * (`citata-api`); other stages get a suffix (`citata-api-pr-12`).
 */
export const workerName = (base: string, stage: string): string =>
  stage === "prod" ? base : `${base}-${stage}`;
