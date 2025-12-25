import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Lock, 
  Globe, 
  Clock, 
  ExternalLink,
  FileText,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowingCard from "@/components/ui/GlowingCard";
import { cn } from "@/lib/utils";
import Scan3DVisualizer from "@/components/Scan3DVisualizer"; // Import 3D Visualizer
import jsPDF from "jspdf"; // Import jsPDF

interface ScanResult {
  url: string;
  score: number;
  status: "safe" | "warning" | "danger";
  ssl: boolean;
  reputation: "good" | "unknown" | "bad";
  phishing: boolean;
  malware: boolean;
  recommendations: string[];
  scannedAt: Date;
}

const Scanner = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<ScanResult[]>(() => {
    const saved = localStorage.getItem("pen-scan-history");
    return saved ? JSON.parse(saved) : [];
  });

  const handleScan = async () => {
    if (!url.trim()) return;
    
    setIsScanning(true);
    setResult(null);
    setScanProgress(0);

    // Simulate progressive scan
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => Math.min(prev + Math.random() * 15, 90));
    }, 300);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    clearInterval(progressInterval);
    setScanProgress(100);

    // Mock result
    const isSuspicious = url.includes("suspicious") || url.includes("malware") || url.includes("hack");
    const isWarning = url.includes("warning") || !url.startsWith("https");
    
    const newResult: ScanResult = {
      url,
      score: isSuspicious ? 15 : isWarning ? 55 : 92,
      status: isSuspicious ? "danger" : isWarning ? "warning" : "safe",
      ssl: url.startsWith("https"),
      reputation: isSuspicious ? "bad" : isWarning ? "unknown" : "good",
      phishing: isSuspicious,
      malware: isSuspicious,
      recommendations: isSuspicious 
        ? ["N'accédez pas à ce site", "Signalez ce lien", "Vérifiez l'URL officielle"]
        : isWarning
        ? ["Vérifiez le certificat SSL", "Soyez prudent avec vos données", "Utilisez un VPN"]
        : ["Ce site semble fiable", "Restez vigilant", "Mettez à jour votre navigateur"],
      scannedAt: new Date(),
    };

    setResult(newResult);
    
    // Save to history
    const newHistory = [newResult, ...history.slice(0, 9)];
    setHistory(newHistory);
    localStorage.setItem("pen-scan-history", JSON.stringify(newHistory));
    
    setIsScanning(false);
  };

  const generatePdfReport = (scanResult: ScanResult) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Rapport d'Analyse de Sécurité PEN", 10, 20);
    doc.setFontSize(12);
    doc.text(`URL Analysée: ${scanResult.url}`, 10, 35);
    doc.text(`Statut: ${statusConfig[scanResult.status].label}`, 10, 45);
    doc.text(`Score de Sécurité: ${scanResult.score}/100`, 10, 55);
    doc.text(`Date d'Analyse: ${new Date(scanResult.scannedAt).toLocaleString("fr-FR")}`, 10, 65);

    doc.setFontSize(16);
    doc.text("Détails de l'Analyse:", 10, 80);
    doc.setFontSize(12);
    doc.text(`SSL/TLS: ${scanResult.ssl ? "Actif" : "Absent"}`, 10, 90);
    doc.text(`Phishing: ${scanResult.phishing ? "Détecté" : "Non détecté"}`, 10, 100);
    doc.text(`Malware: ${scanResult.malware ? "Détecté" : "Non détecté"}`, 10, 110);
    doc.text(`Réputation: ${scanResult.reputation === "good" ? "Bonne" : scanResult.reputation === "unknown" ? "Inconnue" : "Mauvaise"}`, 10, 120);

    doc.setFontSize(16);
    doc.text("Recommandations:", 10, 135);
    doc.setFontSize(12);
    scanResult.recommendations.forEach((rec, index) => {
      doc.text(`- ${rec}`, 10, 145 + (index * 10));
    });

    doc.save(`rapport_scan_${scanResult.url.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };


  const statusConfig = {
    safe: {
      color: "text-safe-green",
      bg: "bg-safe-green/10",
      border: "border-safe-green/50",
      icon: CheckCircle2,
      label: "Sécurisé",
    },
    warning: {
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/50",
      icon: AlertTriangle,
      label: "Attention",
    },
    danger: {
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/50",
      icon: Shield,
      label: "Dangereux",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Search className="w-3 h-3 mr-2" />
              Scanner de sécurité
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Analysez un <span className="gradient-text">lien suspect</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vérifiez instantanément si un lien est sûr. Aucune inscription requise, 
              aucune donnée personnelle collectée.
            </p>
          </motion.div>

          {/* Scanner Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <GlowingCard className="p-8">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-xl opacity-50" />
                  <div className="relative flex gap-3">
                    <div className="relative flex-1">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="url"
                        placeholder="https://exemple.com/lien-suspect"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleScan()}
                        className={cn(
                          "pl-12 h-16 text-lg bg-background/50 border-2 transition-all duration-300",
                          "focus:border-primary focus:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                        )}
                      />
                    </div>
                    <Button
                      onClick={handleScan}
                      disabled={isScanning || !url.trim()}
                      size="lg"
                      className="h-16 px-10 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-lg hover:opacity-90"
                    >
                      {isScanning ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          Scanner
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Scanning Animation & 3D Visualizer */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* 3D Visualizer */}
                      <div className="w-full h-48 bg-gray-900 rounded-md overflow-hidden relative">
                        <Scan3DVisualizer />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                          Analyse en cours...
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
                        />
                        <div className="absolute inset-0 bg-shimmer bg-[length:200%_100%] animate-shimmer" />
                      </div>
                      
                      {/* Scan Steps */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Vérification SSL", done: scanProgress > 25 },
                          { label: "Analyse phishing", done: scanProgress > 50 },
                          { label: "Détection malware", done: scanProgress > 75 },
                          { label: "Réputation", done: scanProgress > 90 },
                        ].map((step, index) => (
                          <div
                            key={step.label}
                            className={cn(
                              "flex items-center gap-2 text-sm transition-all",
                              step.done ? "text-accent" : "text-muted-foreground"
                            )}
                          >
                            {step.done ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-current animate-spin border-t-transparent" />
                            )}
                            {step.label}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlowingCard>
          </motion.div>

          {/* Result */}
          <AnimatePresence>
            {result && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto mb-12"
              >
                <GlowingCard 
                  glowColor={result.status === "safe" ? "accent" : result.status === "warning" ? "warning" : "destructive"}
                  className="p-8"
                >
                  {/* Score Header */}
                  <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div
                      className={cn(
                        "relative w-32 h-32 rounded-full flex items-center justify-center",
                        statusConfig[result.status].bg,
                        "border-4",
                        statusConfig[result.status].border
                      )}
                    >
                      <div className="text-center">
                        <div className={cn("text-4xl font-display font-bold", statusConfig[result.status].color)}>
                          {result.score}
                        </div>
                        <div className="text-xs text-muted-foreground">/100</div>
                      </div>
                      {/* Animated Ring */}
                      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className={cn("opacity-20", statusConfig[result.status].color)}
                        />
                        <motion.circle
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: 283 - (283 * result.score) / 100 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray="283"
                          className={statusConfig[result.status].color}
                        />
                      </svg>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <Badge className={cn(statusConfig[result.status].bg, statusConfig[result.status].color, "mb-2")}>
                        {statusConfig[result.status].label}
                      </Badge>
                      <h2 className="text-2xl font-display font-bold mb-2 break-all">
                        {result.url}
                      </h2>
                      <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
                        <Clock className="w-4 h-4" />
                        Analysé le {result.scannedAt.toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { 
                        label: "SSL/TLS", 
                        value: result.ssl ? "Actif" : "Absent",
                        icon: Lock,
                        ok: result.ssl 
                      },
                      { 
                        label: "Phishing", 
                        value: result.phishing ? "Détecté" : "Non détecté",
                        icon: AlertTriangle,
                        ok: !result.phishing 
                      },
                      { 
                        label: "Malware", 
                        value: result.malware ? "Détecté" : "Non détecté",
                        icon: Shield,
                        ok: !result.malware 
                      },
                      { 
                        label: "Réputation", 
                        value: result.reputation === "good" ? "Bonne" : result.reputation === "unknown" ? "Inconnue" : "Mauvaise",
                        icon: Globe,
                        ok: result.reputation === "good" 
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={cn(
                          "p-4 rounded-xl border",
                          item.ok ? "bg-safe-green/5 border-safe-green/20" : "bg-destructive/5 border-destructive/20"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5 mb-2", item.ok ? "text-safe-green" : "text-destructive")} />
                        <div className="font-semibold">{item.label}</div>
                        <div className={cn("text-sm", item.ok ? "text-safe-green" : "text-destructive")}>
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div className="bg-secondary/50 rounded-xl p-6">
                    <h3 className="font-display font-semibold text-lg mb-4">Recommandations</h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button variant="outline" size="sm" onClick={() => result && generatePdfReport(result)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Exporter PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Plus de détails
                    </Button>
                  </div>
                </GlowingCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* History */}
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-muted-foreground" />
                Historique local
              </h2>
              <div className="space-y-3">
                {history.map((item, index) => (
                  <motion.div
                    key={`${item.url}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlowingCard hover={false} className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            statusConfig[item.status].bg
                          )}
                        >
                          <span className={cn("text-lg font-bold", statusConfig[item.status].color)}>
                            {item.score}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{item.url}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(item.scannedAt).toLocaleString("fr-FR")}
                          </div>
                        </div>
                        <Badge className={cn(statusConfig[item.status].bg, statusConfig[item.status].color)}>
                          {statusConfig[item.status].label}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setUrl(item.url);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          Rescanner
                        </Button>
                      </div>
                    </GlowingCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Scanner;