import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/ritesh-coder404", color: "hover:text-foreground", glow: "hover:shadow-[0_0_20px_hsl(175_80%_50%/0.2)]" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ritesh-thakur-83a862381", color: "hover:text-blue-400", glow: "hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]" },
  { icon: Mail, label: "Email", href: "mailto:ritesh74599@gmail.com", color: "hover:text-primary", glow: "hover:shadow-[0_0_20px_hsl(175_80%_50%/0.3)]" },
  { icon: Phone, label: "WhatsApp", href: "https://wa.me/919517184947", color: "hover:text-green-500", glow: "hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Portfolio message from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\nFrom: ${form.name.trim()} (${form.email.trim()})`);
    window.location.href = `mailto:ritesh74599@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast({ title: "Opening your email app", description: "Press send there to deliver your message." });
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(175 80% 50%), transparent)" }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(260 80% 65%), transparent)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Get In Touch
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Contact<span className="gradient-text"> Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="bg-card border-border focus:border-primary transition-shadow focus:shadow-[0_0_15px_hsl(175_80%_50%/0.15)]"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className="bg-card border-border focus:border-primary transition-shadow focus:shadow-[0_0_15px_hsl(175_80%_50%/0.15)]"
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={5}
              className="bg-card border-border focus:border-primary resize-none transition-shadow focus:shadow-[0_0_15px_hsl(175_80%_50%/0.15)]"
            />
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="magic-button w-full py-3 px-6 rounded-xl font-display text-sm font-bold tracking-wider uppercase text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Feel free to reach out for collaborations, project ideas, or just to say hello.
              You can also find me on these platforms:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`flex items-center gap-3 p-4 rounded-xl bg-card border border-border text-muted-foreground transition-all duration-300 hover:border-primary/50 ${s.color} ${s.glow}`}
                >
                  <s.icon className="w-5 h-5" />
                  <span className="font-display text-sm">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;