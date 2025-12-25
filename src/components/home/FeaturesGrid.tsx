import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Shield, Bot, Wrench, BookOpen, FlaskConical, ArrowRight } from "lucide-react";
import GlowingCard from "@/components/ui/GlowingCard";

const features = [
  {
    icon: Search,
    title: "Scanner de liens",
    description: "Analysez instantanément n'importe quel lien suspect sans inscription",
    href: "/scanner",
    color: "text-primary",
    glowColor: "primary" as const,
  },
  {
    icon: Shield,
    title: "Alertes sécurité",
    description: "Suivez les dernières menaces au Cameroun et dans le monde",
    href: "/actualites",
    color: "text-destructive",
    glowColor: "destructive" as const,
  },
  {
    icon: Bot,
    title: "IA Assistant",
    description: "Posez vos questions cybersécurité à notre IA experte",
    href: "/assistant",
    color: "text-accent",
    glowColor: "accent" as const,
  },
  {
    icon: Wrench,
    title: "Outils gratuits",
    description: "Téléchargez des outils de protection adaptés à vos besoins",
    href: "/outils",
    color: "text-warning",
    glowColor: "warning" as const,
  },
  {
    icon: BookOpen,
    title: "Guides pratiques",
    description: "Apprenez à vous protéger avec nos tutoriels simples",
    href: "/guides",
    color: "text-primary",
    glowColor: "primary" as const,
  },
  {
    icon: FlaskConical,
    title: "Lab interactif",
    description: "Testez vos connaissances et renforcez vos mots de passe",
    href: "/lab",
    color: "text-accent",
    glowColor: "accent" as const,
  },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Tout ce dont vous avez <span className="gradient-text">besoin</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une suite complète d'outils et ressources pour votre cybersécurité, 
            100% gratuite et sans inscription requise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.href}>
                <GlowingCard glowColor={feature.glowColor} className="h-full group">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br from-background to-secondary ${feature.color}`}
                    >
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
                        {feature.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlowingCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
