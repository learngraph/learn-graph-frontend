import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

interface ForceGraphNodeObject {
  id: string;
  x?: number;
  y?: number;
  [key: string]: any;
}

interface ForceGraphLinkObject {
  id: string;
  source: ForceGraphNodeObject | string;
  target: ForceGraphNodeObject | string;
  [key: string]: any;
}

interface ForceGraphGraphData {
  nodes: ForceGraphNodeObject[];
  links: ForceGraphLinkObject[];
}

// Methods expected to be exposed by ForceGraph2D
interface LocalForceGraphMethods {
  // Add any methods you need to replicate from ForceGraph2D, e.g.:
  centerAt: (x: number, y: number, transitionMs?: number) => void;
  zoom: (zoomLevel: number, transitionMs?: number) => void;
  // etc.
}

type NodePaintFn = (
  node: ForceGraphNodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => void;

type LinkPaintFn = (
  link: ForceGraphLinkObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => void;

type NodePointerAreaPaintFn = (
  node: ForceGraphNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => void;

type LinkPointerAreaPaintFn = (
  link: ForceGraphLinkObject,
  color: string,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => void;

// Props similar to ForceGraph2D
interface LandMap2DProps {
  graphData: ForceGraphGraphData;
  width?: number;
  height?: number;
  backgroundColor?: string;

  // Drawing functions
  nodeCanvasObject?: NodePaintFn;
  linkCanvasObject?: LinkPaintFn;
  nodePointerAreaPaint?: NodePointerAreaPaintFn;
  linkPointerAreaPaint?: LinkPointerAreaPaintFn;

  // Interaction callbacks
  onNodeClick?: (node: ForceGraphNodeObject, event: MouseEvent) => void;
  onLinkClick?: (link: ForceGraphLinkObject, event: MouseEvent) => void;
  onNodeHover?: (
    node: ForceGraphNodeObject | null,
    prevNode: ForceGraphNodeObject | null,
  ) => void;
  onLinkHover?: (
    link: ForceGraphLinkObject | null,
    prevLink: ForceGraphLinkObject | null,
  ) => void;
  onBackgroundClick?: (event: MouseEvent) => void;
  onZoom?: (transform: { k: number; x: number; y: number }) => void;
  onNodeDrag?: (
    node: ForceGraphNodeObject,
    translate: { dx: number; dy: number },
  ) => void;
  onNodeDragEnd?: (node: ForceGraphNodeObject) => void;

  // Mode function
  linkCanvasObjectMode?: () => string; // If needed for compatibility

  // Scale factor for rendering
  // ... Add other ForceGraph2D props you rely on
}

// Simple utility to generate unique colors for picking
function colorStrFromId(id: number) {
  // id must fit into 24-bit color
  // This is a simplistic approach; ensure no collisions for a large number of nodes/links.
  const r = (id & 0xff0000) >> 16;
  const g = (id & 0x00ff00) >> 8;
  const b = id & 0x0000ff;
  return `rgb(${r},${g},${b})`;
}

// Extract numeric ID from color
// Not strictly necessary if we invert with a lookup table
// We'll keep a mapping from color->object
interface HoverObjects {
  node?: ForceGraphNodeObject;
  link?: ForceGraphLinkObject;
}

export const LandMap2D = forwardRef<LocalForceGraphMethods, LandMap2DProps>(
  (
    {
      graphData,
      width = 600,
      height = 400,
      backgroundColor = "white",
      nodeCanvasObject,
      linkCanvasObject,
      nodePointerAreaPaint,
      linkPointerAreaPaint,
      onNodeClick,
      onLinkClick,
      onNodeHover,
      onLinkHover,
      onBackgroundClick,
      onZoom,
      onNodeDrag,
      onNodeDragEnd,
      linkCanvasObjectMode,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerCanvasRef = useRef<HTMLCanvasElement>(null);

    // Transform state for pan/zoom
    const [transform, setTransformState] = useState({ x: 0, y: 0, k: 1 });
    // FIXME(hack): somewhere transform object becomes null
    const setTransform = (newTf: {x: number, y: number, k: number}) => {
      setTransformState({ x: newTf.x ?? 0, y: newTf.y ?? 0, k: newTf.k ?? 1 });
    };
    const [isPanning, setIsPanning] = useState(false);
    const [isDraggingNode, setIsDraggingNode] =
      useState<ForceGraphNodeObject | null>(null);
    const [lastDragPos, setLastDragPos] = useState<{
      x: number;
      y: number;
    } | null>(null);
    const [hoverObj, setHoverObj] = useState<HoverObjects>({});
    const [dragButton, setDragButton] = useState<number | null>(null); // Track which button initiated the drag

    // For picking: We'll keep a map from color -> {node?, link?}
    const colorToObject = useRef<Map<string, HoverObjects>>(new Map());

    // Methods to be exposed via ref
    useImperativeHandle(ref, () => ({
      centerAt: (x: number, y: number, transitionMs?: number) => {
        // Simple instant center
        setTransform((prev) => ({
          ...prev,
          x: width / 2 - x * prev.k,
          y: height / 2 - y * prev.k,
        }));
      },
      zoom: (zoomLevel: number, transitionMs?: number) => {
        // Simple zoom to a given scale around center
        setTransform((prev) => {
          const cx = width / 2;
          const cy = height / 2;
          // Zoom around center
          const newK = zoomLevel;
          return {
            x: cx - (cx - prev.x) * (newK / prev.k),
            y: cy - (cy - prev.y) * (newK / prev.k),
            k: newK,
          };
        });
      },
    }));

    const drawScene = useCallback(() => {
      console.log(`drawScene: ${[transform.x, transform.x]}`);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      // Clear
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      const globalScale = transform.k;

      // Draw links first
      if (linkCanvasObject) {
        ctx.save();
        graphData.links.forEach((link) => {
          ctx.save();
          linkCanvasObject(link, ctx, globalScale);
          ctx.restore();
        });
        ctx.restore();
      }

      // Draw nodes
      if (nodeCanvasObject) {
        ctx.save();
        graphData.nodes.forEach((node) => {
          if (node.x == null || node.y == null) return;
          ctx.save();
          ctx.translate(node.x, node.y);
          nodeCanvasObject(node, ctx, globalScale);
          ctx.restore();
        });
        ctx.restore();
      }

      ctx.restore();
    }, [
      graphData,
      transform,
      width,
      height,
      backgroundColor,
      nodeCanvasObject,
      linkCanvasObject,
    ]);

    const drawPointerScene = useCallback(() => {
      const canvas = pointerCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      colorToObject.current.clear();

      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      const globalScale = transform.k;

      // Assign IDs and colors to nodes and links for picking
      let objId = 1;
      // Links first (so nodes can overlap?)
      if (linkPointerAreaPaint && linkCanvasObject) {
        graphData.links.forEach((link) => {
          const color = colorStrFromId(objId++);
          ctx.save();
          linkPointerAreaPaint(link, color, ctx, globalScale);
          ctx.restore();
          colorToObject.current.set(color, { link });
        });
      }

      // Nodes
      if (nodePointerAreaPaint && nodeCanvasObject) {
        graphData.nodes.forEach((node) => {
          if (node.x == null || node.y == null) return;
          const color = colorStrFromId(objId++);
          ctx.save();
          ctx.translate(node.x, node.y);
          nodePointerAreaPaint(node, color, ctx, globalScale);
          ctx.restore();
          colorToObject.current.set(color, { node });
        });
      }

      ctx.restore();
    }, [
      graphData,
      transform,
      width,
      height,
      nodePointerAreaPaint,
      linkPointerAreaPaint,
    ]);

    const getObjectAtScreenPos = useCallback(
      (x: number, y: number): HoverObjects | {} => {
        const canvas = pointerCanvasRef.current;
        if (!canvas) return {};
        const ctx = canvas.getContext("2d");
        if (!ctx) return {};
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const colorKey = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
        return colorToObject.current.get(colorKey) || {};
      },
      [],
    );

    // Handle hover
    const handleHover = useCallback(
      (x: number, y: number) => {
        const obj = getObjectAtScreenPos(x, y) as HoverObjects;
        const { node, link } = obj;

        if (node !== hoverObj.node) {
          if (onNodeHover) onNodeHover(node || null, hoverObj.node || null);
        }
        if (link !== hoverObj.link) {
          if (onLinkHover) onLinkHover(link || null, hoverObj.link || null);
        }

        setHoverObj(obj);
      },
      [hoverObj, onNodeHover, onLinkHover, getObjectAtScreenPos],
    );

    // Mouse/Pointer event handlers
    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        // Right-click drag => pan
        // Left-click on a node => drag node?
        if (e.button === 2) {
          // Begin panning
          setIsPanning(true);
          setDragButton(2);
        } else if (e.button === 0) {
          // Check if we clicked on a node
          const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const obj = getObjectAtScreenPos(x, y);
          console.log("click on obj", obj);
          if (obj && obj.node) {
            setIsDraggingNode(obj.node);
            setLastDragPos({ x, y });
            setDragButton(0);
          }
        }
      },
      [getObjectAtScreenPos],
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent) => {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isPanning && dragButton === 2) {
          // Pan the view
          // Compute delta
          // We'll move the graph according to mouse movement
          const dx = e.movementX;
          const dy = e.movementY;
          setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
          if (onZoom)
            onZoom({
              k: transform.k,
              x: transform.x + dx,
              y: transform.y + dy,
            });
        } else if (isDraggingNode && dragButton === 0 && lastDragPos) {
          // Dragging a node
          const dx = (x - lastDragPos.x) / transform.k;
          const dy = (y - lastDragPos.y) / transform.k;
          isDraggingNode.x = (isDraggingNode.x ?? 0) + dx;
          isDraggingNode.y = (isDraggingNode.y ?? 0) + dy;
          setLastDragPos({ x, y });
          if (onNodeDrag) onNodeDrag(isDraggingNode, { dx, dy });
        } else {
          // Hover
          handleHover(x, y);
        }
      },
      [
        isPanning,
        isDraggingNode,
        dragButton,
        transform,
        lastDragPos,
        handleHover,
        onNodeDrag,
        onZoom,
      ],
    );

    const handlePointerUp = useCallback(
      (e: React.PointerEvent) => {
        // If dragging node, finalize
        if (isDraggingNode) {
          if (onNodeDragEnd) onNodeDragEnd(isDraggingNode);
          setIsDraggingNode(null);
        }
        setIsPanning(false);
        setDragButton(null);
      },
      [isDraggingNode, onNodeDragEnd],
    );

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const obj = getObjectAtScreenPos(x, y);
        if (obj && obj.node) {
          if (onNodeClick) onNodeClick(obj.node, e.nativeEvent);
        } else if (obj && obj.link) {
          if (onLinkClick) onLinkClick(obj.link, e.nativeEvent);
        } else {
          if (onBackgroundClick) onBackgroundClick(e.nativeEvent);
        }
      },
      [getObjectAtScreenPos, onNodeClick, onLinkClick, onBackgroundClick],
    );

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
    }, []);

    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        console.log("scroll!!!111", JSON.stringify(transform));
        // Zoom in/out
        // Support cmd+scroll for zoom (mac trackpad)
        const delta = e.deltaY;
        let newK = transform.k * (delta > 0 ? 0.9 : 1.1);
        if (e.metaKey) {
          // cmd key pressed => zoom even more?
          newK = transform.k * (delta > 0 ? 0.8 : 1.2);
        }

        // Zoom around mouse position
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const { x, y, k } = transform;
        const scaleFactor = newK / k;
        const newX = mx - (mx - x) * scaleFactor;
        const newY = my - (my - y) * scaleFactor;
        const newTransform = { x: newX, y: newY, k: newK };
        setTransform(newTransform);
        if (onZoom) onZoom(newTransform);
      },
      [transform, onZoom],
    );

    // Resize canvas if needed
    useLayoutEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }

      const pointerCanvas = pointerCanvasRef.current;
      if (pointerCanvas) {
        pointerCanvas.width = width;
        pointerCanvas.height = height;
      }
    }, [width, height]);

    // Redraw scene on changes
    useEffect(() => {
      drawScene();
      drawPointerScene();
    }, [drawScene, drawPointerScene]);

    return (
      <div style={{ position: "relative", width, height }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            background: backgroundColor,
            cursor: isPanning
              ? "grabbing"
              : isDraggingNode
                ? "grabbing"
                : "auto",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          onWheel={handleWheel}
        />
        <canvas ref={pointerCanvasRef} style={{ display: "none" }} />
      </div>
    );
  },
);
