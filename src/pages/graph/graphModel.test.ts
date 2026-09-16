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
      4, 7, 3, 5,
    ]);
    expect(new Set(allTopicIds).size).toBe(allTopicIds.length);
  });

  it("keeps Collaborate direct while Services remains a provisional workbench", () => {
    expect(territories.collaborate.topics).toEqual([
      "collaborate-services",
      "collaborate-pilot-learngraph",
      "collaborate-implementation-partnerships",
    ]);
    expect(topics["collaborate-services"].slot?.copyStatus).toBe("not-created");
    expect(topics["collaborate-services"].clusterLabel).toBeUndefined();
  });

  it("gives learning access its own territory without absorbing product behaviour", () => {
    expect(territories["learning-access"].label).toBe("Who Gets to Learn");
    expect(territories["learning-access"].topics).toEqual([
      "learning-access",
      "learning-access-sovereignty",
      "learning-access-frontiers",
      "learning-access-activism",
      "activism-gfcca",
      "activism-afghanistan",
      "activism-world-educare-network",
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
    Object.values(topics)
      .filter((topic) => topic.kind === "topic")
      .forEach((topic) => {
        expect(topic.purpose.trim()).not.toBe("");
        expect(topic.slot).toBeDefined();
        expect(workEstimateLabels[topic.slot!.workEstimate].trim()).not.toBe(
          "",
        );
        expect(topic.slot!.statusNote.trim()).not.toBe("");
      });
  });

  it("keeps every workbench address unique and routable", () => {
    const territorySlugs = territoryOrder.map((id) => territories[id].slug);
    const topicPaths = Object.values(topics).map(pathForTopic);

    expect(new Set(territorySlugs).size).toBe(territorySlugs.length);
    expect(new Set(topicPaths).size).toBe(topicPaths.length);

    Object.values(topics).forEach((topic) => {
      const territory = territoryFromSlug(territories[topic.territory].slug);
      const clusterSlug = topic.clusterLabel
        ? Object.values(topics).find(
            (candidate) =>
              candidate.kind === "cluster" &&
              candidate.label === topic.clusterLabel,
          )?.slug
        : undefined;
      expect(topicFromRoute(territory, topic.slug, clusterSlug)?.id).toBe(
        topic.id,
      );
    });
  });

  it("keeps activism as a real cluster with three case nodes", () => {
    expect(topics["learning-access-activism"].kind).toBe("cluster");
    expect(topics["activism-gfcca"].parentId).toBe("learning-access-activism");
    expect(pathForTopic(topics["activism-afghanistan"])).toBe(
      "/who-gets-to-learn/activism/afghanistan",
    );
  });

  it("keeps the editorial map available while the public map stays closed", () => {
    expect(topicIdsForView("platform", true)).toEqual(
      territories.platform.topics,
    );
    expect(publicTerritoryOrder).toEqual([]);
    expect(topicIdsForView("platform", false)).toEqual([]);
  });
});
