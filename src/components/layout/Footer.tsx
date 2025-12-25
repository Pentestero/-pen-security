import { Link } from "react-router-dom";
import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Scanner de liens", href: "/scanner" },
      { label: "Actualités", href: "/actualites" },
      { label: "Outils", href: "/outils" },
      { label: "IA Assistant", href: "/assistant" },
    ],
    resources: [
      { label: "Guides pratiques", href: "/guides" },
      { label: "Lab interactif", href: "/lab" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Conditions d'utilisation", href: "/conditions" },
    ],
  };

  return (
    <footer className="relative mt-20 border-t border-border/50 bg-card/50 backdrop-blur-xl">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="font-display font-bold text-2xl gradient-text">
                PEN
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              La cybersécurité expliquée simplement pour tous les Camerounais. 
              Protégez-vous, informez-vous, agissez.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "mailto:contact@pen-cyber.cm" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Plateforme</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Ressources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} PEN - Protection & Éducation Numérique. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Plateforme 100% gratuite et sans inscription
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
