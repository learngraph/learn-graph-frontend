import { useEffect, useRef } from "react";

import { useI18n } from "@/i18n/i18n";
import { LaunchButton } from "@/pages/global/components/LaunchButton";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function HeroMycelium() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useI18n();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 55;
    const MAX_DIST = 300;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background fade
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

        // draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alpha = 1 - dist / MAX_DIST;
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // node
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="hero-mycelium">
      <canvas ref={canvasRef} />
      <div className="hero-copy">
        <span className="eyebrow">DIGITAL MYCELIUM</span>
        <h1>
         <h1>{t("hero.headline")}</h1>
        </h1>
        <span></span>
        <div></div>
        <LaunchButton />
      </div>
    </section>
  );
}
