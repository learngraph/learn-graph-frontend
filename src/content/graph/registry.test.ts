import { describe, expect, it } from "vitest";
import { contentGraphRegistry } from "./registry";
import { validateContentGraph, visibleArchitectureNodes } from "./validation";

describe("content graph registry", () => {
  it("passes structural validation", () => {
    expect(validateContentGraph(contentGraphRegistry)).toEqual([]);
  });

  it("models Collaborate through its two distinct clusters", () => {
    const clusters = contentGraphRegistry.nodes.filter(
      (node) => node.kind === "cluster",
    );
    const childCounts = clusters.map(
      (cluster) =>
        contentGraphRegistry.nodes.filter(
          (node) => node.parentId === cluster.id,
        ).length,
    );

    expect(clusters.map((cluster) => cluster.id)).toEqual([
      "cluster-transformation-services",
      "cluster-learngraph-partnerships",
    ]);
    expect(childCounts).toEqual([3, 3]);
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

  it("preserves approved concepts whose public labels remain unresolved", () => {
    const buildOffer = contentGraphRegistry.nodes.find(
      (node) => node.id === "collaborate-build-offer",
    );
    const access = contentGraphRegistry.nodes.find(
      (node) => node.id === "about-access",
    );

    expect(buildOffer?.architectureStatus).toBe("approved");
    expect(buildOffer?.labelStatus).toBe("provisional");
    expect(access?.architectureStatus).toBe("approved");
    expect(access?.labelStatus).toBe("provisional");
    expect(access?.canonicalPath).toBe("/about/access");
  });

  it("holds the approved Platform baseline in the typed content graph", () => {
    const platformTopics = contentGraphRegistry.nodes.filter(
      (node) => node.parentId === "territory-platform",
    );
    const briefNodeIds = contentGraphRegistry.briefs.map(
      (brief) => brief.nodeId,
    );

    expect(platformTopics).toHaveLength(4);
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
      "about-access",
      "about-network",
      "about-impact",
    ]);
    expect(
      contentGraphRegistry.nodes.some((node) => node.id === "about-impact"),
    ).toBe(true);
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
