import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Wrench, 
  Download, 
  Shield, 
  Lock, 
  Smartphone, 
  Building2, 
  GraduationCap,
  User,
  Star,
  ExternalLink,
  Search,
  Filter,
  Loader2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Not used currently, but kept for future expansion
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowingCard from "@/components/ui/GlowingCard";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";


// Interface Tool (similar to Admin.tsx, ensure consistency)
interface Tool {
  id: string;
  name: string;
  description: string;
  download_url: string;
  is_premium: boolean;
  created_at: string;
}

const audienceIcons = {
  particulier: User,
  pme: Building2,
  etudiant: GraduationCap,
};

const audienceLabels = {
  particulier: "Particulier",
  pme: "PME",
  etudiant: "Étudiant",
};

const Outils = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ is_subscribed: boolean } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Not used currently, could be added later

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
      if (error) {
        toast({
          title: 'Erreur',
          description: 'Échec du chargement des outils : ' + error.message,
          variant: 'destructive',
        });
      } else {
        setTools(data as Tool[]);
      }
      setLoading(false);
    };

    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_subscribed')
          .eq('id', user.id)
          .single();
        if (error) {
          console.error("Erreur de chargement du profil:", error.message);
          setProfile(null);
        } else if (data) {
          setProfile(data);
        }
      } else {
        setProfile(null); // Pas d'utilisateur connecté
      }
    };

    fetchTools();
    fetchProfile();
  }, [user, toast]);

  const handleAccessTool = (tool: Tool) => {
    if (tool.is_premium && (!user || !profile?.is_subscribed)) {
      toast({
        title: 'Accès Premium Requis',
        description: 'Cet outil est réservé aux abonnés Premium. Veuillez vous abonner pour y accéder.',
        variant: 'info',
      });
      navigate('/pricing');
    } else {
      window.open(tool.download_url, '_blank');
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    // For audience, we need to consider if tool.audience is still part of the tool object after fetching from DB.
    // As per DB schema, `tools` table does not have an `audience` column directly.
    // If we want to filter by audience, we'd need to add it to the DB schema or filter dynamically.
    // For now, removing audience filter to match DB structure.
    // const matchesAudience = !selectedAudience || (tool.audience && tool.audience.includes(selectedAudience));
    // const matchesCategory = !selectedCategory || tool.category === selectedCategory; // Also removed for simplicity as category is not in DB schema

    return matchesSearch; // && matchesAudience && matchesCategory;
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
            <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
              <Wrench className="w-3 h-3 mr-2" />
              Outils & Ressources
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Outils de <span className="gradient-text">Protection</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Téléchargez des outils de cybersécurité vérifiés et adaptés.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un outil..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {/* Audience Filter - Removed as per DB schema, can be added back if `audience` column is added to 'tools' table */}
              {/* <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedAudience === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAudience(null)}
                >
                  Tous
                </Button>
                {Object.entries(audienceLabels).map(([key, label]) => {
                  const Icon = audienceIcons[key as keyof typeof audienceIcons];
                  return (
                    <Button
                      key={key}
                      variant={selectedAudience === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedAudience(selectedAudience === key ? null : key)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Button>
                  );
                })}
              </div> */}
            </div>
          </motion.div>

          {/* Tools List */}
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTools.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucun outil disponible pour le moment ou ne correspond à votre recherche.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-display font-semibold mb-6">
                Tous les outils
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <GlowingCard className="h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Wrench className="w-6 h-6 text-primary" /> {/* Generic Wrench icon */}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-lg">{tool.name}</h3>
                          <Badge variant="secondary" className="mb-2">
                            {tool.is_premium ? "Premium" : "Gratuit"}
                          </Badge>
                          {/* Rating and Downloads were hardcoded, removed for now */}
                          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-warning fill-warning" />
                            {tool.rating}
                          </div> */}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {tool.description}
                      </p>

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleAccessTool(tool)}
                        disabled={authLoading}
                      >
                        {tool.is_premium && (!user || !profile?.is_subscribed) ? (
                          <>S'abonner pour accéder <ChevronRight className="w-4 h-4 ml-1" /></>
                        ) : (
                          <>Télécharger <Download className="w-4 h-4 ml-1" /></>
                        )}
                      </Button>
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

export default Outils;
