import { describe, expect, it } from "vitest";
import { contentGraphRegistry } from "./registry";
import {
  publicArchitectureNodes,
  validateContentGraph,
  visibleArchitectureNodes,
} from "./validation";

describe("content graph registry", () => {
  it("passes structural validation", () => {
    expect(validateContentGraph(contentGraphRegistry)).toEqual([]);
  });

  it("keeps Collaborate direct while its service architecture is being resolved", () => {
    const clusters = contentGraphRegistry.nodes.filter(
      (node) => node.kind === "cluster",
    );
    const collaborateTopics = contentGraphRegistry.nodes.filter(
      (node) => node.parentId === "territory-collaborate",
    );

    expect(clusters).toHaveLength(0);
    expect(collaborateTopics.map((topic) => topic.id)).toEqual([
      "collaborate-services",
      "collaborate-pilot-learngraph",
      "collaborate-implementation-partnerships",
    ]);
    expect(collaborateTopics[0]?.contentId).toBe(
      "content-collaborate-services-workbench",
    );
  });

  it("keeps Research / Open Source reserved and hidden", () => {
    const researchNodes = contentGraphRegistry.nodes.filter(
      (node) =>
        node.id === "territory-research-open-source" ||
        node.parentId === "territory-research-open-source",
    );

    expect(researchNodes).toHaveLength(5);
    researchNodes.forEach((node) => {
      expect(node.architectureStatus).toBe("reserved");
      expect(node.publicationStatus).toBe("hidden");
    });
    expect(
      visibleArchitectureNodes(contentGraphRegistry).some(
        (node) => node.id === "territory-research-open-source",
      ),
    ).toBe(false);
  });

  it("publishes only complete branches with approved content", () => {
    const publicNodeIds = new Set([
      "root-learngraph",
      "territory-platform",
      "platform-using-learngraph",
    ]);
    const publicContentIds = new Set([
      "content-lg-introduction",
      "content-platform-introduction",
      "content-platform-using-learngraph",
    ]);
    const registry = {
      ...contentGraphRegistry,
      nodes: contentGraphRegistry.nodes.map((node) => ({
        ...node,
        publicationStatus: publicNodeIds.has(node.id)
          ? ("publishable" as const)
          : node.publicationStatus,
      })),
      contents: contentGraphRegistry.contents.map((content) => ({
        ...content,
        publicationStatus: publicContentIds.has(content.id)
          ? ("publishable" as const)
          : content.publicationStatus,
      })),
    };

    expect(publicArchitectureNodes(registry).map((node) => node.id)).toEqual([
      "root-learngraph",
      "territory-platform",
      "platform-using-learngraph",
    ]);
  });

  it("preserves approved concepts whose public labels remain unresolved", () => {
    const services = contentGraphRegistry.nodes.find(
      (node) => node.id === "collaborate-services",
    );
    const access = contentGraphRegistry.nodes.find(
      (node) => node.id === "learning-access",
    );

    expect(services?.architectureStatus).toBe("approved");
    expect(services?.labelStatus).toBe("provisional");
    expect(access?.architectureStatus).toBe("approved");
    expect(access?.labelStatus).toBe("provisional");
    expect(access?.canonicalPath).toBe("/who-gets-to-learn/access");
  });

  it("holds the approved Platform baseline in the typed content graph", () => {
    const platformTopics = contentGraphRegistry.nodes.filter(
      (node) => node.parentId === "territory-platform",
    );
    const briefNodeIds = contentGraphRegistry.briefs
      .map((brief) => brief.nodeId)
      .filter((nodeId) => platformTopics.some((topic) => topic.id === nodeId));

    expect(platformTopics).toHaveLength(3);
    expect(briefNodeIds).toEqual(platformTopics.map((topic) => topic.id));
    expect(platformTopics.every((topic) => topic.contentId !== undefined)).toBe(
      true,
    );
    platformTopics.forEach((topic) => {
      expect(
        contentGraphRegistry.contents.some(
          (content) => content.id === topic.contentId,
        ),
      ).toBe(true);
    });

    const unverifiedArtifacts = contentGraphRegistry.artifacts.filter(
      (artifact) => artifact.truthStatus === "requires-verification",
    );
    expect(unverifiedArtifacts).toHaveLength(2);
  });

  it("models LearnGraph and Platform as content-bearing parents", () => {
    const root = contentGraphRegistry.nodes.find(
      (node) => node.id === "root-learngraph",
    );
    const platform = contentGraphRegistry.nodes.find(
      (node) => node.id === "territory-platform",
    );

    expect(root?.kind).toBe("root");
    expect(root?.contentId).toBe("content-lg-introduction");
    expect(platform?.parentId).toBe(root?.id);
    expect(platform?.contentId).toBe("content-platform-introduction");
  });

  it("keeps About substance-led and gives Impact its own case-study job", () => {
    const about = contentGraphRegistry.nodes.find(
      (node) => node.id === "territory-about",
    );
    const aboutTopics = contentGraphRegistry.nodes.filter(
      (node) => node.parentId === about?.id,
    );

    expect(about?.contentId).toBe("content-about-introduction");
    expect(aboutTopics.map((node) => node.id)).toEqual([
      "about-origin",
      "about-people",
      "about-network",
      "about-impact",
    ]);
    expect(
      contentGraphRegistry.nodes.some((node) => node.id === "about-impact"),
    ).toBe(true);
  });

  it("separates learning access from About, Collaborate, and Platform behaviour", () => {
    const territory = contentGraphRegistry.nodes.find(
      (node) => node.id === "territory-learning-access",
    );
    const territoryTopics = contentGraphRegistry.nodes.filter(
      (node) => node.parentId === territory?.id,
    );

    expect(territory?.contentId).toBe("content-learning-access-introduction");
    expect(territoryTopics.map((node) => node.id)).toEqual([
      "learning-access",
      "learning-access-sovereignty",
      "learning-access-frontiers",
    ]);
    expect(
      contentGraphRegistry.nodes.find(
        (node) => node.id === "platform-inclusive-learning",
      )?.parentId,
    ).toBe("territory-platform");
  });

  it("tracks an explicit editorial state for every topic", () => {
    const topicIds = contentGraphRegistry.nodes
      .filter((node) => node.kind === "topic")
      .map((node) => node.id);

    expect(
      contentGraphRegistry.contentSlots.map((slot) => slot.nodeId).sort(),
    ).toEqual([...topicIds].sort());
    expect(
      contentGraphRegistry.contentSlots.some(
        (slot) => slot.copyStatus === "approved",
      ),
    ).toBe(false);
  });

  it("puts identified source material within reach of every sourced topic", () => {
    contentGraphRegistry.contentSlots
      .filter((slot) => slot.sourceAvailability !== "none")
      .forEach((slot) => {
        expect(
          contentGraphRegistry.sourceCandidates.some(
            (source) => source.nodeId === slot.nodeId,
          ),
        ).toBe(true);
      });
  });
});
