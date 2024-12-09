
const Logo = ({ size = 100 }) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const nodeRadius = size * 0.08;
    const mainCircleRadius = size * 0.13;
    const lineLength = size * 0.25;
    const nodeColor = "green";
    const OutlineColor = "orange";
    const lineColor = "orange";
  
    // Calculate positions for the surrounding nodes
    const nodes = [
      { x: centerX + lineLength+1.2 * Math.cos(Math.PI / 2) -23, y: centerY - lineLength * Math.sin(Math.PI / 2) -10 },
      { x: centerX + lineLength * Math.cos(Math.PI * 6.9 / 6), y: centerY - lineLength * Math.sin(Math.PI * 5 / 6) },
      { x: centerX + lineLength+12.91 * Math.cos(Math.PI * 11 / 6), y: centerY - lineLength * Math.sin(Math.PI * 7 / 6) },
      { x: centerX + lineLength * Math.cos(Math.PI * 13 / 4), y: centerY - lineLength * Math.sin(Math.PI * 11 / 6) +15 },
    ];
  
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Central Circle */}
      <circle cx={centerX} cy={centerY} r={mainCircleRadius} fill="orange" stroke={OutlineColor} strokeWidth={nodeRadius * 0.5} />
      
      {/* Connecting Lines */}
      {nodes.map((node, index) => {
        // Calculate the angle of the line
        const angle = Math.atan2(node.y - centerY, node.x - centerX);
        
        // Calculate the starting point on the edge of the central circle
        const startX = centerX + mainCircleRadius  * Math.cos(angle);
        const startY = centerY + mainCircleRadius * Math.sin(angle);
  
        return (
          <line
            key={index}
            x1={startX}
            y1={startY}
            x2={node.x}
            y2={node.y}
            stroke={lineColor}
            strokeWidth={nodeRadius * 0.3}
          />
        );
      })}
      
      {/* Outer Nodes */}
      {nodes.map((node, index) => (
        <circle key={index} cx={node.x} cy={node.y} r={nodeRadius} fill={nodeColor} />
      ))}
    </svg>
    );
  };
  
  export default Logo;
  