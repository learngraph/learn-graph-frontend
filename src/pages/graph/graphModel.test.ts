import { describe, expect, it } from "vitest";
import { territories, territoryOrder, topics } from "./graphModel";

describe("graph website model", () => {
  it("gives every territory four unique topics", () => {
    const allTopicIds = territoryOrder.flatMap((id) => territories[id].topics);

    territoryOrder.forEach((id) => {
      expect(territories[id].topics).toHaveLength(4);
    });
    expect(new Set(allTopicIds).size).toBe(allTopicIds.length);
  });

  it("gives every visible edge a relationship", () => {
    Object.values(topics).forEach((topic) => {
      expect(topic.relation.trim()).not.toBe("");
      topic.connections?.forEach((connection) => {
        expect(connection.relation.trim()).not.toBe("");
      });
    });
  });

  it("keeps all topic and cross-connection references valid", () => {
    territoryOrder.forEach((territoryId) => {
      territories[territoryId].topics.forEach((topicId) => {
        expect(topics[topicId].territory).toBe(territoryId);
      });
    });

    Object.values(topics).forEach((topic) => {
      topic.connections?.forEach((connection) => {
        expect(topics[connection.id]).toBeDefined();
      });
    });
  });
});
