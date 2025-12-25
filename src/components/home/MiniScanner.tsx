import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Shield, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ScanResult {
  score: number;
  status: "safe" | "warning" | "danger";
  message: string;
}

const MiniScanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setIsScanning(true);
    setResult(null);

    // Simulate scan
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock result based on URL
    const isSuspicious = url.includes("suspicious") || url.includes("malware");
    const isWarning = url.includes("warning") || !url.startsWith("https");
    
    setResult({
      score: isSuspicious ? 25 : isWarning ? 65 : 95,
      status: isSuspicious ? "danger" : isWarning ? "warning" : "safe",
      message: isSuspicious
        ? "Lien potentiellement dangereux détecté"
        : isWarning
        ? "Quelques précautions recommandées"
        : "Ce lien semble sécurisé",
    });
    setIsScanning(false);
  };

  const statusColors = {
    safe: "text-safe-green border-safe-green bg-safe-green/10",
    warning: "text-warning border-warning bg-warning/10",
    danger: "text-destructive border-destructive bg-destructive/10",
  };

  const statusIcons = {
    safe: CheckCircle2,
    warning: AlertTriangle,
    danger: Shield,
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card-glow p-6 md:p-8"
      >
        <div className="flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-50" />
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Collez un lien suspect ici..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  className={cn(
                    "pl-12 h-14 text-lg bg-background/50 border-2 transition-all duration-300",
                    "focus:border-primary focus:shadow-[0_0_20px_rgba(0,217,255,0.3)]",
                    "placeholder:text-muted-foreground/50"
                  )}
                />
              </div>
              <Button
                onClick={handleScan}
                disabled={isScanning || !url.trim()}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-all"
              >
                {isScanning ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Scanner"
                )}
              </Button>
            </div>
          </div>

          {/* Scanning Animation */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Analyse en cours... Vérification SSL, réputation, phishing...
              </div>
            </motion.div>
          )}

          {/* Result */}
          {result && !isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "p-4 rounded-xl border-2 flex items-center gap-4",
                statusColors[result.status]
              )}
            >
              {(() => {
                const Icon = statusIcons[result.status];
                return <Icon className="w-8 h-8" />;
              })()}
              <div className="flex-1">
                <div className="font-semibold text-lg">{result.message}</div>
                <div className="text-sm opacity-80">
                  Score de sécurité: {result.score}/100
                </div>
              </div>
              <div
                className={cn(
                  "text-4xl font-display font-bold",
                  result.status === "safe" && "text-safe-green",
                  result.status === "warning" && "text-warning",
                  result.status === "danger" && "text-destructive"
                )}
              >
                {result.score}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MiniScanner;
