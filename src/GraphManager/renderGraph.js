/* eslint-disable @typescript-eslint/ban-ts-comment */
import ForceGraph from "force-graph";
// @ts-ignore
import * as d3 from "d3-force-3d";

export function buildGraphFromData(data) {
  const g = ForceGraph()(document.getElementById("graph"));

  g.graphData(data);
  g.nodeId("id");

  // node display
  g.nodeAutoColorBy("group");
  g.nodeCanvasObject((node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 22 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const padding = 0.2;
    const bckgDimensions = [textWidth, fontSize].map(
      (n) => n + fontSize * padding
    );

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2,
      ...bckgDimensions
    );

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = node.color;
    ctx.fillText(label, node.x, node.y);

    node.bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
  });
  g.nodePointerAreaPaint((node, color, ctx) => {
    ctx.fillStyle = color;
    const bckgDimensions = node.bckgDimensions;
    bckgDimensions &&
      ctx.fillRect(
        node.x - bckgDimensions[0] / 2,
        node.y - bckgDimensions[1] / 2,
        ...bckgDimensions
      );
  });

  // link display
  g.linkDirectionalArrowLength(10);
  g.linkDirectionalArrowRelPos(0.7);
  g.linkCanvasObjectMode = () => "after";
  g.linkCanvasObject((link, ctx, scale) => {
    const label = link.note ? `${link.value}: ${link.note}` : link.value; // TODO: maybe add description? or as pop-up?
    // put text in the middle
    const fontSize = 14 / scale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const x = (link.source.x + link.target.x) / 2;
    const y = (link.source.y + link.target.y) / 2;
    ctx.fillText(label, x, y);

    // draw line between nodes
    ctx.save();
    ctx.globalAlpha = 0.2;
    //ctx.fillStyle = "rgba(125, 125, 125, 0.5)"; // opacity..

    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.stroke();

    ctx.restore();
  });

  // forces
  const chargeForce = d3.forceManyBody();
  chargeForce.strength(-1000); // high inter-node repulsion to force a clean layout
  g.d3Force("charge", chargeForce);
  const maxLinkValue = 15;
  const defaultLinkForce = 1 / 2;
  const linkForce = d3.forceLink(data.links);
  linkForce.strength((l, _, __) => {
    console.log(
      `linkForce=${l.value ? l.value / maxLinkValue : defaultLinkForce}`
    );
    return l.value ? l.value / maxLinkValue : defaultLinkForce;
  });
  linkForce.id((d) => d.id);
  linkForce.initialize(data.nodes);
  g.d3Force("link", linkForce);
  const centerForce = d3.forceCenter([0, 0]);
  centerForce.strength(0.05); // want relatively low center force, so that layout mostly depends on links
  g.d3Force("center", centerForce);
}
