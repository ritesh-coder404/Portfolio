import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, BookOpen, Github } from "lucide-react";

const projects = [
  {
    title: "SlotEase",
    subtitle: "Online Appointment Booking System",
    icon: CalendarCheck,
    tags: ["React", "Node.js", "Express.js", "Supabase"],
    points: [
      "Full stack appointment booking platform for clinics, salons and small businesses in India.",
      "Designed the PostgreSQL schema (profiles, services, slots, bookings) in Supabase with Supabase Auth.",
      "REST APIs with Express.js and email booking confirmations using Nodemailer.",
      "React (Vite) frontend with react-router-dom and axios; frontend on Vercel, backend on Render.",
    ],
  },
  {
    title: "BookStore",
    subtitle: "E-Commerce Web Application",
    icon: BookOpen,
    tags: ["React", "Vite", "Tailwind CSS", "Supabase"],
    points: [
      "Online bookstore with separate customer and admin modules.",
      "Authentication, PostgreSQL database, Row Level Security policies and file storage using Supabase.",
      "Responsive Tailwind CSS UI with a demo payment flow.",
    ],
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
                    <h3 className="font-display text-xl font-semibold text-foreground">{project.title}</h3>
                    <p className="text-sm text-primary mb-4">{project.subtitle}</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-sm leading-relaxed mb-5">
                      {project.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
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
                    <a
                      href="https://github.com/ritesh-coder404"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Github className="w-4 h-4" /> GitHub profile
                    </a>
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
