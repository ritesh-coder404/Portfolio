import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { subscribe, isPlaying, toggleMusic } from "@/lib/music";

const MusicToggle = () => {
  const playing = useSyncExternalStore(subscribe, isPlaying);
  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full border border-primary/40 bg-card/80 backdrop-blur text-primary hover:border-glow transition-all"
    >
      {playing ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      <span className="flex items-end gap-0.5 h-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-0.5 bg-primary rounded-full"
            animate={{ height: playing ? ["30%", "100%", "40%"] : "30%" }}
            transition={{ duration: 0.8, repeat: playing ? Infinity : 0, delay: i * 0.15, repeatType: "mirror" }}
          />
        ))}
      </span>
    </button>
  );
};

export default MusicToggle;
