import React, { useEffect, useRef } from "react";
import { LaunchButton } from "@/pages/global/components/LaunchButton";

/* ============================================================
   HERO SPHERE — INTENTIONAL / GPU-SAFE
   ============================================================ */

/* ============================================================
   RESPONSIVE PROFILES (ONLY PLACE TO TUNE BEHAVIOR)
   ============================================================ */

type SphereProfile = {
  scale: number;          // overall globe size
  nodes: number;          // total nodes
  maxLinks: number;       // max connections per node
  phaseThreshold: number; // temporal sparsity
};

const PROFILES = {
  desktop: {
    scale: 0.42,
    nodes: 120,
    maxLinks: 3,
    phaseThreshold: 0.3,
  },
  tablet: {
    scale: 0.38,
    nodes: 90,
    maxLinks: 2,
    phaseThreshold: 0.35,
  },
  mobile: {
    scale: 0.34,
    nodes: 60,
    maxLinks: 1,
    phaseThreshold: 0.42,
  },
  //   mobile: {
  //   scale: 0.34,
  //   nodes: 60,
  //   maxLinks: 1,
  //   phaseThreshold: 0.42,
  // },
};

let profile: SphereProfile = PROFILES.desktop;

const pickProfile = () => {
  const w = window.innerWidth;
  if (w < 640) profile = PROFILES.mobile;
  else if (w < 1024) profile = PROFILES.tablet;
  else profile = PROFILES.desktop;
};

/* ============================================================
   FIXED GLOBAL CONSTANTS (SAFE)
   ============================================================ */

const FOCAL_LENGTH = 900;
const ROTATION_SPEED = 0.0005;
const BREATH_AMPLITUDE = 6;
const PHASE_SPEED = 0.4;



const GLOW_RADIUS = 2.8;     // 2.4 – 3.2
const GLOW_CORE = 0.18;      // 0.12 – 0.22
const GLOW_MID = 0.10;       // 0.06 – 0.14

/* ============================================================
   COMPONENT
   ============================================================ */

export default function HeroSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    /* ============================================================
       CANVAS / VIEWPORT
       ============================================================ */

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let sphereRadius = 300;

    const resize = () => {
      pickProfile();

      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.max(1, Math.floor(width));
      canvas.height = Math.max(1, Math.floor(height));

      cx = width / 2;
      cy = height / 2;

      sphereRadius = Math.min(width, height) * profile.scale;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ============================================================
       GEOMETRY — SPHERE POINTS
       ============================================================ */

    type Point3D = {
      x: number;
      y: number;
      z: number;
      phase: number;
      hub: boolean;
    };

    const points: Point3D[] = [];

    for (let i = 0; i < profile.nodes; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / profile.nodes);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r = sphereRadius * (0.9 + Math.random() * 0.2);

      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        phase: Math.random() * Math.PI * 2,
        hub: Math.random() > 0.85,
      });
    }

    /* ============================================================
       ANIMATION STATE
       ============================================================ */

    let rotationY = 0;
    let time = 0;

    /* ============================================================
       RENDER LOOP
       ============================================================ */

    const animate = () => {
      time += 0.01;
      rotationY += ROTATION_SPEED;

      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, width, height);

      /* ============================================================
         PROJECTION (3D → 2D)
         ============================================================ */

      type ProjectedPoint = {
        x: number;
        y: number;
        z: number;
        scale: number;
        p: Point3D;
      };

      const projected: ProjectedPoint[] = [];

      for (const p of points) {
        const breath = Math.sin(time + p.phase) * BREATH_AMPLITUDE;

        const bx = p.x + breath;
        const by = p.y + breath;
        const bz = p.z;

        const x = bx * Math.cos(rotationY) - bz * Math.sin(rotationY);
        const z = bz * Math.cos(rotationY) + bx * Math.sin(rotationY);
        const y = by;

        const scale = FOCAL_LENGTH / (FOCAL_LENGTH + z);

        projected.push({
          x: cx + x * scale,
          y: cy + y * scale,
          z,
          scale,
          p,
        });
      }

      projected.sort((a, b) => b.z - a.z);

      /* ============================================================
         CONNECTION HELPERS (SCALED)
         ============================================================ */

      const CONNECTION_DISTANCE = sphereRadius * 0.55;
      const MAX_2D_DIST = sphereRadius * 0.75;
      const SURFACE_Z = sphereRadius * 0.78;
      const MAX_SURFACE_CHORD = sphereRadius * 0.38;

      /* ============================================================
         CONNECTIONS
         ============================================================ */

      for (let i = 0; i < projected.length; i++) {
        let localLinks = 0;

        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];

          // 3D distance gate
          const dx = a.p.x - b.p.x;
          const dy = a.p.y - b.p.y;
          const dz = a.p.z - b.p.z;
          if (dx * dx + dy * dy + dz * dz > CONNECTION_DISTANCE ** 2) continue;

          // 2D sanity gate
          const dx2 = a.x - b.x;
          const dy2 = a.y - b.y;
          if (dx2 * dx2 + dy2 * dy2 > MAX_2D_DIST ** 2) continue;

          // per-node cap
          if (localLinks >= profile.maxLinks) continue;

          // temporal sparsity
          const phase = Math.sin(time * PHASE_SPEED + i * 0.7 + j * 0.3);
          if (phase < profile.phaseThreshold) continue;

          // surface bias
          const aSurface = Math.abs(a.z) > SURFACE_Z;
          const bSurface = Math.abs(b.z) > SURFACE_Z;

          if (aSurface && bSurface) {
            const sx = a.x - b.x;
            const sy = a.y - b.y;
            if (sx * sx + sy * sy > MAX_SURFACE_CHORD ** 2) continue;
          }

          let alpha = 0.05;
          let widthMul = 0.6;

          if (aSurface && bSurface) {
            alpha = 0.35;
            widthMul = 1.4;
          } else if (aSurface || bSurface) {
            alpha = 0.15;
            widthMul = 1.0;
          } else {
            alpha = 0.025;
            widthMul = 0.5;
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(212,249,54,${alpha})`;
          ctx.lineWidth = widthMul * a.scale;
          ctx.stroke();

          localLinks++;
        }
      }

      /* ============================================================
         NODES
         ============================================================ */

      for (const n of projected) {
        const size = (n.p.hub ? 3.5 : 2) * n.scale;

        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        const glowRadius = size * GLOW_RADIUS;  // dial that glow in the top settings 

        const gradient = ctx.createRadialGradient(
          n.x,
          n.y,
          size * 0.4,   // inner core
          n.x,
          n.y,
          glowRadius   // outer falloff
        );

        gradient.addColorStop(0, "rgba(255,255,255,0.18)");
        gradient.addColorStop(0.4, "rgba(255,255,255,0.10)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => ro.disconnect();
  }, []);

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
      <div className="absolute z-20 bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto">
        <LaunchButton />
      </div>
    </div>
  );
}
