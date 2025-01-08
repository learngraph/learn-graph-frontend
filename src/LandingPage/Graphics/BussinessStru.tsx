export default function BusinessGraph({ size = 200 }) {
  const centerX = size / 2;
  const centerY = size / 3;
  const nodeRadius = size * 0.05;
  const horizontalGap = size * 0.15;
  const verticalGap = size * 0.2;
  const nodeColor = "orange";
  const lineColor = "yellow";

  // Nodes
  const nodes = [
    { id: 1, x: centerX, y: centerY }, // Top
    { id: 2, x: centerX - horizontalGap, y: centerY + verticalGap }, // Middle-left
    { id: 3, x: centerX + horizontalGap, y: centerY + verticalGap }, // Middle-right
    { id: 4, x: centerX - 2 * horizontalGap, y: centerY + 2 * verticalGap }, // Bottom-left 1
    { id: 5, x: centerX - horizontalGap, y: centerY + 2 * verticalGap }, // Bottom-left 2
    { id: 6, x: centerX, y: centerY + 2 * verticalGap }, // Bottom-center
    { id: 7, x: centerX + horizontalGap, y: centerY + 2 * verticalGap }, // Bottom-right 1
    { id: 8, x: centerX + 2 * horizontalGap, y: centerY + 2 * verticalGap }, // Bottom-right 2
  ];

  // Edges
  const edges = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 3, to: 8 },
  ];

  return (
    <svg 
    viewBox={`0 0 ${size} ${size}`}
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    style={{ display: "block", maxWidth: "100%", maxHeight: "100%", background:"none" }}
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
