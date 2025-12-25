import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Shield, Bug, Wifi, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: 1,
    title: "Nouvelle campagne de phishing ciblant Orange Money",
    severity: "critical",
    date: "Il y a 2h",
    icon: AlertTriangle,
    description: "Des SMS frauduleux circulent demandant vos identifiants.",
  },
  {
    id: 2,
    title: "Vulnérabilité critique dans WhatsApp Desktop",
    severity: "high",
    date: "Il y a 5h",
    icon: Bug,
    description: "Mettez à jour votre application immédiatement.",
  },
  {
    id: 3,
    title: "Attaque DDoS sur les serveurs gouvernementaux",
    severity: "medium",
    date: "Il y a 8h",
    icon: Wifi,
    description: "Plusieurs sites administratifs temporairement indisponibles.",
  },
  {
    id: 4,
    title: "Nouveau ransomware détecté en Afrique Centrale",
    severity: "critical",
    date: "Il y a 12h",
    icon: Shield,
    description: "Sauvegardez vos données et évitez les pièces jointes suspectes.",
  },
];

const severityStyles = {
  critical: {
    bg: "bg-destructive/10",
    border: "border-destructive/50",
    badge: "bg-destructive text-destructive-foreground",
    icon: "text-destructive",
  },
  high: {
    bg: "bg-warning/10",
    border: "border-warning/50",
    badge: "bg-warning text-warning-foreground",
    icon: "text-warning",
  },
  medium: {
    bg: "bg-primary/10",
    border: "border-primary/50",
    badge: "bg-primary text-primary-foreground",
    icon: "text-primary",
  },
};

const AlertsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % alerts.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + alerts.length) % alerts.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge variant="outline" className="mb-4 border-destructive/50 text-destructive">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse mr-2" />
            Alertes en temps réel
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Dernières <span className="gradient-text">Menaces Détectées</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Restez informé des dernières cybermenaces affectant le Cameroun et l'Afrique
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "p-6 md:p-8 border-2 rounded-2xl",
                  severityStyles[alerts[current].severity as keyof typeof severityStyles].bg,
                  severityStyles[alerts[current].severity as keyof typeof severityStyles].border
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl bg-background/50",
                      severityStyles[alerts[current].severity as keyof typeof severityStyles].icon
                    )}
                  >
                    {(() => {
                      const Icon = alerts[current].icon;
                      return <Icon className="w-8 h-8" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <Badge
                        className={
                          severityStyles[alerts[current].severity as keyof typeof severityStyles]
                            .badge
                        }
                      >
                        {alerts[current].severity === "critical"
                          ? "Critique"
                          : alerts[current].severity === "high"
                          ? "Élevé"
                          : "Modéré"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {alerts[current].date}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-semibold mb-2">
                      {alerts[current].title}
                    </h3>
                    <p className="text-muted-foreground">{alerts[current].description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {alerts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setIsAutoPlaying(false);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === current
                      ? "w-8 bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertsCarousel;
