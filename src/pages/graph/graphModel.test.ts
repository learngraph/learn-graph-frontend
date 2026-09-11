import { describe, expect, it } from "vitest";
import {
  pathForTopic,
  publicTerritoryOrder,
  territories,
  territoryFromSlug,
  territoryOrder,
  topicIdsForView,
  topicFromRoute,
  topics,
  workEstimateLabels,
} from "./graphModel";

describe("graph website workbench model", () => {
  it("projects the real unequal topic architecture", () => {
    const allTopicIds = territoryOrder.flatMap((id) => territories[id].topics);

    expect(territoryOrder.map((id) => territories[id].topics.length)).toEqual([
      3, 3, 3, 4, 4,
    ]);
    expect(new Set(allTopicIds).size).toBe(allTopicIds.length);
  });

  it("keeps Collaborate direct while Services remains a provisional workbench", () => {
    expect(territories.collaborate.topics).toEqual([
      "collaborate-services",
      "collaborate-pilot-learngraph",
      "collaborate-implementation-partnerships",
    ]);
    expect(topics["collaborate-services"].slot.copyStatus).toBe("not-created");
    expect(topics["collaborate-services"].clusterLabel).toBeUndefined();
  });

  it("gives learning access its own territory without absorbing product behaviour", () => {
    expect(territories["learning-access"].label).toBe("Who Gets to Learn");
    expect(territories["learning-access"].topics).toEqual([
      "learning-access",
      "learning-access-sovereignty",
      "learning-access-frontiers",
    ]);
    expect(territories.platform.topics).toContain(
      "platform-inclusive-learning",
    );
    expect(territories.about.topics).not.toContain("learning-access");
    expect(territories.platform.topics).not.toContain(
      "learning-access-sovereignty",
    );
    expect(territories.collaborate.topics).not.toContain(
      "learning-access-frontiers",
    );
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

  it("keeps the editorial map available while the public map stays closed", () => {
    expect(topicIdsForView("platform", true)).toEqual(
      territories.platform.topics,
    );
    expect(publicTerritoryOrder).toEqual([]);
    expect(topicIdsForView("platform", false)).toEqual([]);
  });
});
