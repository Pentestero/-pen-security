import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Shield, Zap } from "lucide-react";
import GlowingCard from "@/components/ui/GlowingCard";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

interface Threat {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  type: string;
  count: number;
}

const threatTypes = {
  phishing: { icon: AlertTriangle, color: "bg-warning", label: "Phishing" },
  malware: { icon: Shield, color: "bg-destructive", label: "Malware" },
  ransomware: { icon: Zap, color: "bg-primary", label: "Ransomware" },
  ddos: { icon: Zap, color: "bg-accent", label: "DDoS" },
};

const LiveThreatsMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [threats, setThreats] = useState<Threat[]>([]);

  useEffect(() => {
    // Fetch map data
    axios.get("/cameroon.geojson").then(res => {
      setGeoData(res.data);
    }).catch(err => console.error("Could not load geojson", err));

    // Fetch threats data
    const fetchThreats = async () => {
      const { data, error } = await supabase.from('threats').select('*');
      if (error) {
        console.error("Error fetching threats:", error.message);
      } else {
        setThreats(data as Threat[]);
      }
    };

    fetchThreats();
  }, []);

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
            <GlowingCard className="h-full w-full p-0 overflow-hidden">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 3000,
                  center: [12.3, 5.5],
                }}
                className="w-full h-full"
              >
                {geoData && (
                  <Geographies geography={geoData}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="hsl(var(--primary) / 0.1)"
                          stroke="hsl(var(--border) / 0.5)"
                          strokeWidth={0.5}
                        />
                      ))
                    }
                  </Geographies>
                )}
                {threats.map((location) => {
                  const threatType = threatTypes[location.type as keyof typeof threatTypes] || threatTypes.phishing;
                  return (
                    <Marker key={location.id} coordinates={[location.longitude, location.latitude]}>
                      <g className="relative group">
                        <motion.g
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: [0.5, 1.5], opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                        >
                            <circle cx="0" cy="0" r="5" className="fill-current text-destructive/50" />
                        </motion.g>
                        <circle r={3} className={`fill-current ${threatType.color.replace('bg-', 'text-')}`} />
                        <foreignObject x="-50" y="-70" width="100" height="60" className="pointer-events-none">
                            <div className="relative bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <div className="bg-popover text-popover-foreground text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                                    <div className="font-semibold">{location.city}</div>
                                    <div className="text-muted-foreground">
                                        {threatType.label}: {location.count} cas
                                    </div>
                                </div>
                            </div>
                        </foreignObject>
                      </g>
                    </Marker>
                  );
                })}
              </ComposableMap>
            </GlowingCard>
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
                  const total = threats
                    .filter((l) => l.type === key)
                    .reduce((sum, l) => sum + l.count, 0);
                  const grandTotal = threats.reduce((sum, l) => sum + l.count, 0) || 1;
                  const percentage = Math.round((total / grandTotal) * 100);
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
