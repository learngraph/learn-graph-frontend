import type { FC } from "react";
import type { NodeContent } from "../content/graph";
import { ImpactNode } from "./about/impact/ImpactNode";
import { NetworkNode } from "./about/network/NetworkNode";
import { OriginNode } from "./about/origin/OriginNode";
import { ConvictionsNode } from "./about/convictions/ConvictionsNode";
import { AccessNode } from "./learning-access/access/AccessNode";
import { ActivismNode } from "./learning-access/activism/ActivismNode";
import { PilotNode } from "./collaborate/pilot/PilotNode";
import { ImplementationPartnershipsNode } from "./collaborate/implementation-partnerships/ImplementationPartnershipsNode";
import { FrontiersNode } from "./learning-access/learning-without-frontiers/FrontiersNode";
import { ModelNode } from "./platform/model/ModelNode";
import { TheGraphNode } from "./platform/the-graph/TheGraphNode";
import { UsingLearnGraphNode } from "./platform/using-learngraph/UsingLearnGraph";
import { EditorialContent } from "./shared/EditorialContent";

type NodeView = FC<{ content: NodeContent; path: string[] }>;

const viewsByLayout: Partial<
  Record<NonNullable<NodeContent["layout"]>, NodeView>
> = {
  "product-tour": UsingLearnGraphNode,
  "model-system": ModelNode,
  "graph-essay": TheGraphNode,
  impact: ImpactNode,
  atlas: NetworkNode,
  frontiers: FrontiersNode,
  origin: OriginNode,
  convictions: ConvictionsNode,
  access: AccessNode,
  activism: ActivismNode,
  "activism-case": ActivismNode,
  pilot: PilotNode,
  "partnership-model": ImplementationPartnershipsNode,
  "partnership-field": ImplementationPartnershipsNode,
};

export function resolveNodeView(content: NodeContent): NodeView {
  const view = content.layout ? viewsByLayout[content.layout] : undefined;
  return view ?? EditorialContent;
}
