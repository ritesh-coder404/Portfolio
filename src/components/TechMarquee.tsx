const tech = [
  "React", "Node.js", "Express.js", "Supabase", "PostgreSQL", "Tailwind CSS",
  "JavaScript", "TypeScript", "Vite", "REST APIs", "Git & GitHub", "Vercel", "Render",
];

/** Infinite scrolling tech-stack strip. Pauses on hover. */
const TechMarquee = () => {
  const row = [...tech, ...tech]; // duplicate so the loop looks seamless

  return (
    <div
      className="relative py-6 border-y border-border bg-card/40 backdrop-blur-sm overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-display text-sm px-5 py-2 rounded-full border border-border bg-secondary text-foreground whitespace-nowrap hover:border-primary/60 hover:text-primary transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
