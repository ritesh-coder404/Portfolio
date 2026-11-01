import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  { title: "Bachelor of Computer Applications (BCA)", place: "Kanpur Institute of Technology", when: "Currently pursuing, 2nd year" },
  {
    title: "Advanced Diploma in Computer Application (ADCA)",
    place: "Avon Computer & Technical Institute, Ballia",
    when: "2023 – 2024 · Scored 92/100",
    note: "MS Office, Internet & Networking, HTML, System Maintenance, Tally Accounting, DTP (PageMaker, CorelDraw, Photoshop)",
  },
  { title: "Intermediate (Class 12), UP Board", place: "B B Inter College Nawanagar, Ballia", when: "2024" },
  { title: "High School (Class 10), UP Board", place: "B B Inter College Nawanagar, Ballia", when: "2022" },
];

const certifications = [
  { title: "Domestic IT Helpdesk Attendant", place: "IT-ITeS Sector Skill Council (NCVET recognised, Skill India)", when: "450 hours · 2024" },
  { title: "Course on Computer Concepts (CCC)", place: "NIELIT (NCVET recognised)", when: "90 hours · 2024" },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">Education</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Learning <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          <ol className="lg:col-span-3 relative border-l-2 border-primary/40 pl-8 space-y-8">
            {education.map((e, i) => (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_12px_hsl(175_80%_50%/0.7)]" />
                <div className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/40 hover:border-glow transition-all duration-300">
                  <h3 className="font-display text-base font-bold text-foreground flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-primary mt-1 shrink-0" /> {e.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.place}</p>
                  <p className="text-xs text-primary mt-1">{e.when}</p>
                  {e.note && <p className="text-xs text-muted-foreground mt-2">Coursework: {e.note}</p>}
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="lg:col-span-2 space-y-4">
            <p className="font-display text-sm tracking-widest uppercase text-primary">Certifications</p>
            {certifications.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -4 }}
                className="bg-card/90 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/40 hover:border-glow transition-colors duration-300"
              >
                <h3 className="font-display text-base font-bold text-foreground flex items-start gap-2">
                  <Award className="w-4 h-4 text-primary mt-1 shrink-0" /> {c.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{c.place}</p>
                <p className="text-xs text-primary mt-1">{c.when}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
