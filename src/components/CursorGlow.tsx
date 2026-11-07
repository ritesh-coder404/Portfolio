import { useEffect, useRef, useState } from "react";

/** Desktop-only: soft glow that trails the mouse + a small dot that grows over links/buttons. */
const CursorGlow = () => {
  const dot = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // touch devices (phones/tablets) pe cursor effect nahi chahiye
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [role='button']"));
    };

    const loop = () => {
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      if (glow.current) glow.current.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glow}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[5] w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.14) 0%, transparent 65%)" }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className={`fixed top-0 left-0 z-[200] rounded-full pointer-events-none border border-primary transition-[width,height,background-color] duration-200 ${
          hovering ? "w-10 h-10 bg-primary/20" : "w-3 h-3 bg-primary"
        }`}
      />
    </>
  );
};

export default CursorGlow;
