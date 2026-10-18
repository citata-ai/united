import { expect, it } from "@effect/vitest";
import { workerName } from "./name.ts";

it("prod keeps the plain name and other stages get a suffix", () => {
  expect(workerName("citata-api", "prod")).toBe("citata-api");
  expect(workerName("citata-api", "pr-12")).toBe("citata-api-pr-12");
});
