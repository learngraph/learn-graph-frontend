export default function FoundationGraph({ size = 200 }) {
  const centerX = size / 2;
  const centerY = size / 3;
  const nodeRadius = size * 0.05;
  const horizontalGap = size * 0.15;
  const verticalGap = size * 0.2;
  const nodeColor = "orange";
  const lineColor = "yellow";

  // Nodes
  const nodes = [
    { id: 1, x: centerX - horizontalGap, y: centerY }, // Top-left
    { id: 2, x: centerX, y: centerY }, // Top-center
    { id: 3, x: centerX + horizontalGap, y: centerY }, // Top-right
    { id: 4, x: centerX, y: centerY + verticalGap }, // Middle
    { id: 5, x: centerX - horizontalGap, y: centerY + 2 * verticalGap }, // Bottom-left
    { id: 6, x: centerX, y: centerY + 2 * verticalGap }, // Bottom-center
    { id: 7, x: centerX + horizontalGap, y: centerY + 2 * verticalGap }, // Bottom-right
  ];

  // Edges
  const edges = [
    { from: 1, to: 4 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
    { from: 4, to: 7 },
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        background: "none",
      }}
    >
      {/* Edges */}
      {edges.map((edge, index) => {
        const fromNode = nodes.find((node) => node.id === edge.from);
        const toNode = nodes.find((node) => node.id === edge.to);
        if (!fromNode || !toNode) return null;

        return (
          <line
            key={index}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke={lineColor}
            strokeWidth="2"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={nodeRadius}
          fill={nodeColor}
        />
      ))}
    </svg>
  );
}
