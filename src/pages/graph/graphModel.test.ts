import { describe, expect, it } from "vitest";
import {
  pathForTopic,
  territories,
  territoryFromSlug,
  territoryOrder,
  topicFromRoute,
  topics,
  workEstimateLabels,
} from "./graphModel";

describe("graph website workbench model", () => {
  it("projects the real unequal topic architecture", () => {
    const allTopicIds = territoryOrder.flatMap((id) => territories[id].topics);

    expect(territoryOrder.map((id) => territories[id].topics.length)).toEqual([
      4, 5, 4, 4,
    ]);
    expect(new Set(allTopicIds).size).toBe(allTopicIds.length);
  });

  it("retains Collaborate's two clusters", () => {
    const collaborateTopics = territories.collaborate.topics.map(
      (id) => topics[id],
    );

    expect(
      collaborateTopics.filter(
        (topic) => topic.clusterLabel === "Transformation services",
      ),
    ).toHaveLength(3);
    expect(
      collaborateTopics.filter(
        (topic) => topic.clusterLabel === "LearnGraph partnerships",
      ),
    ).toHaveLength(2);
  });

  it("gives every topic a visible editorial state", () => {
    Object.values(topics).forEach((topic) => {
      expect(topic.purpose.trim()).not.toBe("");
      expect(workEstimateLabels[topic.slot.workEstimate].trim()).not.toBe("");
      expect(topic.slot.statusNote.trim()).not.toBe("");
    });
  });

  it("keeps every workbench address unique and routable", () => {
    const territorySlugs = territoryOrder.map((id) => territories[id].slug);
    const topicPaths = Object.values(topics).map(pathForTopic);

    expect(new Set(territorySlugs).size).toBe(territorySlugs.length);
    expect(new Set(topicPaths).size).toBe(topicPaths.length);

    Object.values(topics).forEach((topic) => {
      const territory = territoryFromSlug(territories[topic.territory].slug);
      expect(topicFromRoute(territory, topic.slug)?.id).toBe(topic.id);
    });
  });

  it("marks Research / Open Source as reserved", () => {
    expect(territories.research.architectureStatus).toBe("reserved");
  });
});
