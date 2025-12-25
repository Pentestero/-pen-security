import { motion } from "framer-motion";
import { Shield, Zap, AlertTriangle, Globe } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlowingCard from "@/components/ui/GlowingCard";

const stats = [
  {
    icon: Shield,
    value: 15847,
    label: "Menaces bloquées",
    suffix: "",
    color: "text-accent",
  },
  {
    icon: Zap,
    value: 2341,
    label: "Scans aujourd'hui",
    suffix: "",
    color: "text-primary",
  },
  {
    icon: AlertTriangle,
    value: 47,
    label: "Alertes actives",
    suffix: "",
    color: "text-warning",
  },
  {
    icon: Globe,
    value: 99,
    label: "Uptime",
    suffix: "%",
    color: "text-safe-green",
  },
];

const StatsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowingCard className="text-center py-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className={`text-3xl md:text-4xl font-display font-bold mb-1 ${stat.color}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
