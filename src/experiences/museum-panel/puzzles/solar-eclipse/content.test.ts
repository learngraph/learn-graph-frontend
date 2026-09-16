import { describe, expect, it } from "vitest";
import { solarEclipsePuzzle } from "./content";

describe("solar eclipse prototype", () => {
  it("keeps every dependency and route attached to a known topic", () => {
    const topicIds = new Set(solarEclipsePuzzle.topics.map(({ id }) => id));

    expect(solarEclipsePuzzle.status).toBe("prototype");
    expect(topicIds.has(solarEclipsePuzzle.goalTopicId)).toBe(true);
    expect(solarEclipsePuzzle.topics.length).toBeGreaterThanOrEqual(5);

    for (const dependency of solarEclipsePuzzle.dependencies) {
      expect(topicIds.has(dependency.topicId)).toBe(true);
      expect(topicIds.has(dependency.prerequisiteId)).toBe(true);
    }

    for (const view of solarEclipsePuzzle.views) {
      for (const topicId of [...view.knownTopicIds, ...view.journeyTopicIds]) {
        expect(topicIds.has(topicId)).toBe(true);
      }
    }
  });
});
