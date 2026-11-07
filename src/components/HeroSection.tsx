import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { MapPin, Download } from "lucide-react";

const roles = ["Full Stack Developer", "Software Developer", "AI & Cloud (DevOps, AWS)"];

const useTypewriter = (words: string[]) => {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const delay = !del && text === word ? 1400 : del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del && text === word) setDel(true);
      else if (del && text === "") {
        setDel(false);
        setI(i + 1);
      } else setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return text;
};

const Counter = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.8,
      delay: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [to]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
};

// apni marzi se numbers/labels badal lo
const stats = [
  { value: 2, suffix: "", label: "Projects Deployed" },
  { value: 92, suffix: "/100", label: "ADCA Score" },
  { value: 5, suffix: "+", label: "Core Technologies" },
];

const HeroSection = () => {
  const typed = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 text-xs font-display text-primary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Open to internships &amp; entry-level roles
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-6 h-5"
        >
          {typed}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">Ritesh Thakur</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          I build full stack web apps with React, Node.js, Express.js and Supabase. Looking for an
          internship or entry-level role, with growth in AI and cloud.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mb-10"
        >
          <MapPin className="w-4 h-4 text-primary" /> Ballia, Uttar Pradesh, India
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground font-display text-sm tracking-wider uppercase rounded-lg hover:border-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-primary/30 text-primary font-display text-sm tracking-wider uppercase rounded-lg hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Contact Me
          </a>
          <a
            href="/Ritesh_Thakur_Resume.pdf"
            download="Ritesh_Thakur_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-primary/30 text-primary font-display text-sm tracking-wider uppercase rounded-lg hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-14"
        >
          {stats.map((st) => (
            <div key={st.label} className="rounded-xl border border-border bg-card/60 backdrop-blur-sm py-4 px-2">
              <p className="font-display text-2xl md:text-3xl font-bold gradient-text">
                <Counter to={st.value} suffix={st.suffix} />
              </p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-1">{st.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-5 h-9 border-2 border-primary/40 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
