import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, BookOpen, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "PORTFOLIO",
    // yaha apna live site link aur repo link paste karo (khali chhodoge to button hide rahega)
    live: "https://portfolio-blush-three-18.vercel.app/",
    github: "https://github.com/ritesh-coder404",
    icon: CalendarCheck,
    tags: ["React", "Node.js", "Express.js", "Supabase"],
  },
  {
    title: "BookStore",
    live: "",
    github: "https://github.com/ritesh-coder404",
    icon: BookOpen,
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
  },
];

const TiltCard = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="h-full transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">My Work</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Featured<span className="gradient-text"> Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TiltCard>
                <div className="h-full rounded-xl border border-border bg-card/90 backdrop-blur-sm overflow-hidden hover:border-primary/50 hover:shadow-[0_0_30px_hsl(175_80%_50%/0.15)] transition-[border-color,box-shadow] duration-300">
                  <div className="h-28 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent flex items-center justify-center">
                    <project.icon className="w-12 h-12 text-primary" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-4">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-display px-2.5 py-1 rounded-full bg-secondary text-primary border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-display hover:-translate-y-0.5 hover:border-glow transition-all"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-display hover:bg-primary/10 hover:-translate-y-0.5 transition-all"
                        >
                          <Github className="w-4 h-4" /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
