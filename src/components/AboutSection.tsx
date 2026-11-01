import { motion } from "framer-motion";
import { Code, Database, Cloud, GraduationCap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">
            About
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5 text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a <span className="text-foreground font-medium">BCA 2nd-year student</span> at Kanpur
              Institute of Technology who builds{" "}
              <span className="text-foreground font-medium">full stack web applications</span> using
              React, Node.js, Express.js and Supabase (PostgreSQL).
            </p>
            <p>
              I'm comfortable with HTML, CSS, JavaScript, REST API integration, authentication and
              database-backed CRUD workflows. My projects SlotEase and BookStore are deployed on
              Vercel and Render.
            </p>
            <p>
              I'm seeking a{" "}
              <span className="text-primary font-medium">Full Stack / Software Developer</span> internship
              or entry-level role, with growth in AI and cloud computing (AWS, DevOps).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Code, label: "Full Stack Dev", desc: "React, Node, Express" },
              { icon: Database, label: "Supabase", desc: "PostgreSQL, Auth, RLS" },
              { icon: Cloud, label: "AI & Cloud", desc: "AWS, DevOps goals" },
              { icon: GraduationCap, label: "BCA 2nd Year", desc: "Kanpur Inst. of Tech." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:border-glow hover:-translate-y-1 transition-all duration-300"
              >
                <item.icon className="w-6 h-6 text-primary mb-3" />
                <p className="font-display text-sm font-bold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
