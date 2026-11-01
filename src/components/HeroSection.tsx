import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const HeroSection = () => {
  const typed = useTypewriter(roles);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
