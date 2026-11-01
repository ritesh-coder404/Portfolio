import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { startMusic } from "@/lib/music";

const R = 90;
const C = 2 * Math.PI * R;

/** Round "goal" loader: ring fills to 100%, becomes an ENTER button, then the screen opens like doors. */
const Preloader = ({ onOpen }: { onOpen: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "ready" | "opening" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "loading") return;
    const id = setInterval(() => setProgress((p) => Math.min(100, p + Math.random() * 6 + 2)), 120);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "loading" && progress >= 100) {
      const t = setTimeout(() => setPhase("ready"), 300);
      return () => clearTimeout(t);
    }
  }, [progress, phase]);

  const enter = () => {
    if (phase !== "ready") return;
    startMusic(); // the click is the user gesture browsers need to allow audio
    onOpen();
    setPhase("opening");
    setTimeout(() => setPhase("done"), 1500);
  };

  if (phase === "done") return null;
  const opening = phase === "opening";
  const ease = [0.76, 0, 0.24, 1] as const;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-label="Portfolio loading screen">
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-background border-r border-primary/30"
        animate={{ x: opening ? "-100%" : 0 }}
        transition={{ duration: 1.1, ease }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-background border-l border-primary/30"
        animate={{ x: opening ? "100%" : 0 }}
        transition={{ duration: 1.1, ease }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.5 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <button
          type="button"
          onClick={enter}
          disabled={phase !== "ready"}
          aria-label={phase === "ready" ? "Enter portfolio" : "Loading"}
          className="relative w-52 h-52 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/60 disabled:cursor-wait"
        >
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="100" cy="100" r={R} fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
            <circle cx="100" cy="100" r="64" fill="none" stroke="hsl(var(--primary) / 0.25)" strokeWidth="2" />
            <circle cx="100" cy="100" r="38" fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="2" />
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - progress / 100)}
              style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)))", transition: "stroke-dashoffset 0.15s linear" }}
            />
          </svg>
          {phase === "ready" && (
            <motion.span
              className="absolute inset-3 rounded-full border border-primary/60"
              animate={{ scale: [1, 1.12], opacity: [0.8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}
          <span className="relative font-display text-primary text-lg font-bold flex items-center gap-1">
            {phase === "loading" ? (
              `${Math.floor(progress)}%`
            ) : (
              <>
                ENTER <Play className="w-4 h-4 fill-primary" />
              </>
            )}
          </span>
        </button>

        <div className="text-center px-6">
          <p className="font-display text-2xl md:text-3xl font-bold gradient-text">Ritesh Thakur</p>
          <p className="text-muted-foreground mt-2">
            {phase === "loading" ? "Welcome to my portfolio… loading" : "Welcome! Click ENTER to open (sound on)"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Preloader;
