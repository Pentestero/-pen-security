import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Smartphone, Monitor, Building2, Download, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowingCard from "@/components/ui/GlowingCard";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface Guide {
  id: string;
  title: string;
  description: string;
  file_url: string;
  is_premium: boolean;
  created_at: string;
}

const Guides = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ is_subscribed: boolean } | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('guides').select('*').order('created_at', { ascending: false });
      if (error) {
        toast({
          title: 'Erreur',
          description: 'Échec du chargement des guides : ' + error.message,
          variant: 'destructive',
        });
      } else {
        setGuides(data as Guide[]);
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

    fetchGuides();
    fetchProfile();
  }, [user, toast]);

  const handleAccessGuide = (guide: Guide) => {
    if (guide.is_premium && (!user || !profile?.is_subscribed)) {
      toast({
        title: 'Accès Premium Requis',
        description: 'Ce guide est réservé aux abonnés Premium. Veuillez vous abonner pour y accéder.',
        variant: 'info',
      });
      navigate('/pricing');
    } else {
      window.open(guide.file_url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <BookOpen className="w-3 h-3 mr-2" />
              Guides Pratiques
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Apprenez à vous <span className="gradient-text">protéger</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tutoriels pas à pas, simples et gratuits pour sécuriser vos appareils</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : guides.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucun guide disponible pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {guides.map((guide, index) => (
                <motion.div key={guide.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <GlowingCard className="h-full">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        {/* Placeholder icon, could be dynamic based on category */}
                        <div className={`p-3 rounded-xl bg-secondary text-primary`}>
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">
                            {guide.is_premium ? "Premium" : "Gratuit"}
                          </Badge>
                          <h3 className="font-display font-semibold text-lg mb-2">{guide.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => handleAccessGuide(guide)}
                        disabled={authLoading}
                      >
                        {guide.is_premium && (!user || !profile?.is_subscribed) ? (
                          <>S'abonner pour accéder <ChevronRight className="w-4 h-4 ml-1" /></>
                        ) : (
                          <>Voir le Guide <Download className="w-4 h-4 ml-1" /></>
                        )}
                      </Button>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
