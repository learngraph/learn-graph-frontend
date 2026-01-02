import { useEffect, useRef } from "react";

export default function HeroEditorial() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="hero-editorial">
      <div className="hero-editorial-bg" aria-hidden />

      <div className="hero-editorial-inner">
        <span className="hero-eyebrow">Learning Infrastructure</span>

        <h1>
          Learning that <em>connects</em>.
        </h1>

        <p className="hero-lead">
          Not courses. Not content.
          <br />
          A living system you can grow inside.
        </p>

        <div className="hero-actions">
          <button className="hero-primary">Start exploring</button>
          <button className="hero-secondary">View concept</button>
        </div>
      </div>
    </section>
  );
}
