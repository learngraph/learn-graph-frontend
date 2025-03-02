export default function Startingpoint({ size = 400 }) {
  const centerX = size / 2;
  const nodeRadius = size * 0.05;
  const bottomNodeRadius = nodeRadius * 2;
  const horizontalGap = size * 0.15;
  const verticalGap = size * 0.2;
  const bottomNodeColor = "yellow";
  const nodeColor = "orange";
  const lineColor = "white";

  // Nodes in an inverted pyramid structure
  const nodes = [
    {
      id: 1,
      x: centerX,
      y: verticalGap * 4,
      radius: bottomNodeRadius,
      color: bottomNodeColor,
    },
    {
      id: 2,
      x: centerX - horizontalGap,
      y: verticalGap * 3,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 3,
      x: centerX + horizontalGap,
      y: verticalGap * 3,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 4,
      x: centerX - 2 * horizontalGap,
      y: verticalGap * 2,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 5,
      x: centerX,
      y: verticalGap * 2,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 6,
      x: centerX + 2 * horizontalGap,
      y: verticalGap * 2,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 7,
      x: centerX - 3 * horizontalGap,
      y: verticalGap,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 8,
      x: centerX - horizontalGap,
      y: verticalGap,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 9,
      x: centerX + horizontalGap,
      y: verticalGap,
      radius: nodeRadius,
      color: nodeColor,
    },
    {
      id: 10,
      x: centerX + 3 * horizontalGap,
      y: verticalGap,
      radius: nodeRadius,
      color: nodeColor,
    },
  ];

  // Edges
  const edges = [
    { from: 2, to: 1 },
    { from: 3, to: 1 },
    { from: 4, to: 2 },
    { from: 5, to: 2 },
    { from: 5, to: 3 },
    { from: 6, to: 3 },
    { from: 7, to: 4 },
    { from: 8, to: 4 },
    { from: 8, to: 5 },
    { from: 9, to: 5 },
    { from: 9, to: 6 },
    { from: 10, to: 6 },
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
          r={node.radius}
          fill={node.color}
        />
      ))}
    </svg>
  );
}
