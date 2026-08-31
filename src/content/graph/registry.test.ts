import { describe, expect, it } from "vitest";
import { contentGraphRegistry } from "./registry";
import { validateContentGraph, visibleArchitectureNodes } from "./validation";

describe("content graph registry", () => {
  it("passes structural validation", () => {
    expect(validateContentGraph(contentGraphRegistry)).toEqual([]);
  });

  it("models Collaborate through two unequal clusters", () => {
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
    expect(childCounts).toEqual([3, 2]);
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
    const foundingCommitment = contentGraphRegistry.nodes.find(
      (node) => node.id === "about-founding-commitment",
    );

    expect(buildOffer?.architectureStatus).toBe("approved");
    expect(buildOffer?.labelStatus).toBe("provisional");
    expect(foundingCommitment?.architectureStatus).toBe("approved");
    expect(foundingCommitment?.labelStatus).toBe("open");
    expect(foundingCommitment?.canonicalPath).toBeUndefined();
  });

  it("populates Platform as draft content without promoting unverified claims", () => {
    const platformTopics = contentGraphRegistry.nodes.filter(
      (node) => node.parentId === "territory-platform",
    );
    const platformContentIds = platformTopics.map((node) => node.contentId);

    expect(platformContentIds).toHaveLength(4);
    expect(platformContentIds.every(Boolean)).toBe(true);
    expect(
      contentGraphRegistry.contents
        .filter((content) => platformContentIds.includes(content.id))
        .every((content) => content.publicationStatus === "draft"),
    ).toBe(true);

    const unverifiedArtifacts = contentGraphRegistry.artifacts.filter(
      (artifact) => artifact.truthStatus === "requires-verification",
    );
    expect(unverifiedArtifacts).toHaveLength(5);
    expect(
      unverifiedArtifacts.some(
        (artifact) => artifact.publicationStatus === "hidden",
      ),
    ).toBe(true);
  });
});
