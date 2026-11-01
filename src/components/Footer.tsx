import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-2xl font-bold gradient-text mb-4">
            Ritesh Thakur
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Thank you for visiting my portfolio.
          </p>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary" /> by Ritesh Thakur
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
