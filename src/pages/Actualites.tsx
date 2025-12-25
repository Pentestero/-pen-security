import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Bug, 
  AlertTriangle, 
  Globe, 
  Calendar,
  Filter,
  Search,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowingCard from "@/components/ui/GlowingCard";
import { cn } from "@/lib/utils";

const vulnerabilities = [
  {
    id: 1,
    title: "Vulnérabilité critique dans Microsoft Exchange",
    description: "Une faille zero-day permet l'exécution de code à distance sur les serveurs Exchange non patchés.",
    severity: "critical",
    date: "2024-01-15",
    category: "Serveur",
    affected: ["Microsoft Exchange 2016", "Microsoft Exchange 2019"],
    solution: "Appliquer immédiatement le patch KB5034129",
    local: false,
  },
  {
    id: 2,
    title: "Campagne de phishing Orange Money Cameroun",
    description: "Des SMS frauduleux demandent aux utilisateurs de confirmer leurs identifiants sur un faux site Orange.",
    severity: "high",
    date: "2024-01-14",
    category: "Phishing",
    affected: ["Utilisateurs Orange Money", "Mobile Banking"],
    solution: "Ne jamais cliquer sur les liens dans les SMS. Vérifier directement sur l'app officielle.",
    local: true,
  },
  {
    id: 3,
    title: "Ransomware LockBit 3.0 - Nouvelles variantes",
    description: "De nouvelles variantes du ransomware LockBit ciblent les PME africaines.",
    severity: "critical",
    date: "2024-01-13",
    category: "Malware",
    affected: ["Windows 10/11", "Serveurs Windows"],
    solution: "Sauvegardes régulières, antivirus à jour, formation des employés.",
    local: true,
  },
  {
    id: 4,
    title: "Fuite de données - Réseau social camerounais",
    description: "Plus de 50 000 comptes utilisateurs exposés suite à une mauvaise configuration de base de données.",
    severity: "high",
    date: "2024-01-12",
    category: "Fuite de données",
    affected: ["Utilisateurs de la plateforme"],
    solution: "Changez vos mots de passe et activez l'authentification à deux facteurs.",
    local: true,
  },
  {
    id: 5,
    title: "Vulnérabilité WordPress - Plugin WooCommerce",
    description: "Faille XSS dans WooCommerce versions < 8.4.0 permettant l'injection de scripts malveillants.",
    severity: "medium",
    date: "2024-01-11",
    category: "Web",
    affected: ["WooCommerce < 8.4.0", "Sites e-commerce WordPress"],
    solution: "Mettre à jour WooCommerce vers la version 8.4.0 ou supérieure.",
    local: false,
  },
  {
    id: 6,
    title: "Attaque DDoS sur les FAI camerounais",
    description: "Plusieurs fournisseurs d'accès internet ont subi des attaques par déni de service.",
    severity: "medium",
    date: "2024-01-10",
    category: "DDoS",
    affected: ["Réseaux FAI", "Services en ligne"],
    solution: "Utilisez des services de protection DDoS et diversifiez vos connexions.",
    local: true,
  },
];

const severityConfig = {
  critical: {
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/50",
    label: "Critique",
    icon: AlertTriangle,
  },
  high: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/50",
    label: "Élevée",
    icon: Zap,
  },
  medium: {
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/50",
    label: "Modérée",
    icon: Shield,
  },
  low: {
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/50",
    label: "Faible",
    icon: Bug,
  },
};

const Actualites = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    const matchesSearch = vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = !selectedSeverity || vuln.severity === selectedSeverity;
    const matchesTab = activeTab === "all" || (activeTab === "local" && vuln.local) || (activeTab === "global" && !vuln.local);
    return matchesSearch && matchesSeverity && matchesTab;
  });

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
            <Badge variant="outline" className="mb-4 border-destructive/50 text-destructive">
              <Zap className="w-3 h-3 mr-2" />
              Actualités & Failles
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Alertes <span className="gradient-text">Cybersécurité</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Suivez les dernières vulnérabilités et menaces au Cameroun et dans le monde. 
              Information claire et actions concrètes.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une vulnérabilité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Toutes
                  </TabsTrigger>
                  <TabsTrigger value="local" className="flex items-center gap-2">
                    🇨🇲 Cameroun
                  </TabsTrigger>
                  <TabsTrigger value="global" className="flex items-center gap-2">
                    🌍 Monde
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Severity Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={selectedSeverity === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity(null)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Toutes les sévérités
              </Button>
              {Object.entries(severityConfig).map(([key, config]) => (
                <Button
                  key={key}
                  variant={selectedSeverity === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSeverity(selectedSeverity === key ? null : key)}
                  className={selectedSeverity === key ? "" : config.color}
                >
                  <config.icon className="w-4 h-4 mr-2" />
                  {config.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Vulnerabilities List */}
          <div className="space-y-4">
            {filteredVulnerabilities.map((vuln, index) => {
              const config = severityConfig[vuln.severity as keyof typeof severityConfig];
              return (
                <motion.div
                  key={vuln.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlowingCard 
                    glowColor={vuln.severity === "critical" ? "destructive" : vuln.severity === "high" ? "warning" : "primary"}
                    className="p-6"
                  >
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Severity Icon */}
                      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0", config.bg)}>
                        <config.icon className={cn("w-7 h-7", config.color)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={cn(config.bg, config.color)}>
                            {config.label}
                          </Badge>
                          <Badge variant="outline">
                            {vuln.category}
                          </Badge>
                          {vuln.local && (
                            <Badge variant="outline" className="border-accent text-accent">
                              🇨🇲 Cameroun
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(vuln.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>

                        <h3 className="text-xl font-display font-semibold">
                          {vuln.title}
                        </h3>

                        <p className="text-muted-foreground">
                          {vuln.description}
                        </p>

                        {/* Affected & Solution */}
                        <div className="grid md:grid-cols-2 gap-4 pt-2">
                          <div className="bg-secondary/50 rounded-lg p-3">
                            <div className="text-sm font-medium mb-1">Systèmes affectés</div>
                            <div className="flex flex-wrap gap-1">
                              {vuln.affected.map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                            <div className="text-sm font-medium mb-1 text-accent">Solution</div>
                            <div className="text-sm text-muted-foreground">
                              {vuln.solution}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex lg:flex-col gap-2 lg:justify-center">
                        <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </GlowingCard>
                </motion.div>
              );
            })}
          </div>

          {filteredVulnerabilities.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune vulnérabilité trouvée</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos filtres de recherche
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Actualites;
