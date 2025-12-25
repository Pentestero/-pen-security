import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ADMIN_EMAIL = 'sikatipierre@gmail.com'; // IMPORTANT: REMPLACEZ PAR VOTRE EMAIL ADMIN

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{ is_subscribed: boolean } | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setProfileLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('is_subscribed')
          .eq('id', user.id)
          .single();

        if (error) {
          toast({
            title: 'Erreur',
            description: 'Échec du chargement du profil utilisateur: ' + error.message,
            variant: 'destructive',
          });
          setProfile(null);
        } else if (data) {
          setProfile(data);
        }
        setProfileLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchProfile();
    }
  }, [user, authLoading, toast]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Erreur de déconnexion',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Déconnexion réussie',
        description: 'Vous avez été déconnecté.',
      });
      navigate('/login');
    }
  };

  if (authLoading || profileLoading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement du tableau de bord...</div>;
  }

  if (!user) {
    // Should be caught by ProtectedRoute, but as a fallback
    navigate('/login');
    return null;
  }

  const isAdmin = user.email === ADMIN_EMAIL;

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center">Bienvenue sur votre Tableau de Bord !</h1>
        <p className="text-center text-lg">
          Connecté en tant que: <span className="font-semibold">{user.email}</span>
        </p>

        {profile && (
          <p className="text-center text-lg">
            Statut d'abonnement: <span className="font-semibold">{profile.is_subscribed ? 'Premium' : 'Gratuit'}</span>
          </p>
        )}

        {!profile?.is_subscribed && (
          <div className="text-center">
            <Button onClick={() => navigate('/pricing')} className="mt-4">
              Abonnez-vous au plan Premium
            </Button>
          </div>
        )}

        {isAdmin && (
          <div className="text-center">
            <Button variant="outline" onClick={() => navigate('/admin')} className="mt-4">
              Accéder au Tableau de Bord Admin
            </Button>
          </div>
        )}

        <div className="text-center">
          <Button variant="destructive" onClick={handleLogout} className="mt-6">
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
