import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Shield, Zap } from "lucide-react";
import GlowingCard from "@/components/ui/GlowingCard";

const threatLocations = [
  { id: 1, city: "Douala", lat: 35, left: 48, type: "phishing", count: 23 },
  { id: 2, city: "Yaoundé", lat: 40, left: 52, type: "malware", count: 18 },
  { id: 3, city: "Bafoussam", lat: 32, left: 45, type: "ransomware", count: 7 },
  { id: 4, city: "Garoua", lat: 25, left: 55, type: "ddos", count: 12 },
  { id: 5, city: "Maroua", lat: 18, left: 58, type: "phishing", count: 9 },
];

const threatTypes = {
  phishing: { icon: AlertTriangle, color: "bg-warning", label: "Phishing" },
  malware: { icon: Shield, color: "bg-destructive", label: "Malware" },
  ransomware: { icon: Zap, color: "bg-primary", label: "Ransomware" },
  ddos: { icon: Zap, color: "bg-accent", label: "DDoS" },
};

const LiveThreatsMap = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Menaces <span className="gradient-text">en temps réel</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualisez les cyberattaques détectées au Cameroun
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border/50">
              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-30 rounded-3xl" />
              
              {/* Threat Points */}
              {threatLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="absolute"
                  style={{ top: `${location.lat}%`, left: `${location.left}%` }}
                >
                  <div className="relative group">
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
                    </div>
                    {/* Point */}
                    <div
                      className={`w-4 h-4 rounded-full ${
                        threatTypes[location.type as keyof typeof threatTypes].color
                      } shadow-lg -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-popover text-popover-foreground text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                        <div className="font-semibold">{location.city}</div>
                        <div className="text-muted-foreground">
                          {threatTypes[location.type as keyof typeof threatTypes].label}: {location.count} cas
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Center Marker - Cameroon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <MapPin className="w-12 h-12 text-primary opacity-30" />
              </div>
            </div>
          </motion.div>

          {/* Stats & Legend */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <GlowingCard className="p-6">
              <h3 className="font-display font-semibold text-xl mb-4">
                Répartition des menaces
              </h3>
              <div className="space-y-4">
                {Object.entries(threatTypes).map(([key, value]) => {
                  const total = threatLocations
                    .filter((l) => l.type === key)
                    .reduce((sum, l) => sum + l.count, 0);
                  const percentage = Math.round((total / 69) * 100);
                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${value.color}`} />
                          <span>{value.label}</span>
                        </div>
                        <span className="text-muted-foreground">{total} détections</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full ${value.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlowingCard>

            <GlowingCard glowColor="warning" className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-warning/10">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h4 className="font-semibold">Alerte active</h4>
                  <p className="text-sm text-muted-foreground">
                    Campagne de phishing en cours à Douala - Restez vigilants
                  </p>
                </div>
              </div>
            </GlowingCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveThreatsMap;
