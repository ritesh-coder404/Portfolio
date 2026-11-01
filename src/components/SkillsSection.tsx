import { motion } from "framer-motion";

const skillCategories = [
  { title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React (Vite)", "Tailwind CSS", "Responsive Design"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Nodemailer"] },
  { title: "Databases & Auth", skills: ["PostgreSQL (Supabase)", "Supabase Auth", "Row Level Security (RLS)", "Supabase Storage"] },
  { title: "Tools & Deployment", skills: ["Git", "GitHub", "VS Code", "Vercel", "Render"] },
  { title: "Computer Applications", skills: ["MS Office", "Tally", "Adobe Photoshop", "CorelDraw"] },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-card/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">Skills</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-14">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.12 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:border-glow transition-all duration-300"
            >
              <h3 className="font-display text-sm tracking-widest uppercase text-primary mb-5">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="font-display text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground border border-border cursor-default hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
