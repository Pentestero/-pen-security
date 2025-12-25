import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Check, Crown, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const Pricing = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // Fetch subscription status
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        setProfileLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('is_subscribed')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error("Erreur de chargement du statut d'abonnement:", error.message);
          setIsSubscribed(false);
        } else if (data) {
          setIsSubscribed(data.is_subscribed);
        }
        setProfileLoading(false);
      } else {
        setIsSubscribed(false);
        setProfileLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  // Redirect if already subscribed
  useEffect(() => {
    if (!profileLoading && isSubscribed) {
      toast({
        title: 'Déjà abonné !',
        description: 'Vous êtes déjà un utilisateur Premium.',
        variant: 'default',
      });
      navigate('/dashboard');
    }
  }, [isSubscribed, profileLoading, navigate, toast]);

  const handleStripeCheckout = async () => {
    if (!user) {
      toast({
        title: 'Connexion requise',
        description: 'Veuillez vous connecter pour vous abonner.',
        variant: 'info',
      });
      navigate('/login');
      return;
    }

    setPaymentProcessing(true);

    // --- MOCK STRIPE CHECKOUT ---
    // In a real application, you would make an API call to your backend
    // to create a Stripe Checkout Session. The backend would handle:
    // 1. Creating the session with the correct price and user ID.
    // 2. Returning the session ID to the frontend.
    // The frontend would then redirect the user to Stripe Checkout.
    //
    // Example backend call:
    // const { data: session, error: checkoutError } = await axios.post('/api/create-stripe-checkout-session', {
    //   priceId: 'price_12345', // Your Stripe Price ID
    //   userId: user.id,
    // });
    // if (checkoutError) { handle error }
    // const stripe = await loadStripe('YOUR_STRIPE_PUBLIC_KEY');
    // stripe.redirectToCheckout({ sessionId: session.id });
    // --- END MOCK ---

    toast({
      title: 'Simulation de paiement Stripe',
      description: 'Le paiement Stripe serait initié ici. (Fonctionnalité réelle à implémenter côté serveur)',
      variant: 'info',
    });

    // Simulate success and update subscription status after a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    const { error } = await supabase
      .from('profiles')
      .update({ is_subscribed: true })
      .eq('id', user.id);

    if (error) {
      toast({
        title: 'Erreur de mise à jour d\'abonnement',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setIsSubscribed(true); // Update local state
      toast({
        title: 'Abonnement réussi ! (Simulé)',
        description: 'Bienvenue dans la communauté Premium !',
        variant: 'success',
      });
      navigate('/dashboard');
    }
    setPaymentProcessing(false);
  };

  const handleMobileMoneyPayment = (method: 'MTN' | 'OM') => {
    if (!user) {
      toast({
        title: 'Connexion requise',
        description: 'Veuillez vous connecter pour vous abonner.',
        variant: 'info',
      });
      navigate('/login');
      return;
    }
    toast({
      title: `Paiement via ${method} Mobile Money`,
      description: `L'intégration ${method} nécessiterait un backend spécifique. Veuillez contacter le support.`,
      variant: 'info',
    });
    // --- Placeholder for MTN/OM integration ---
    // This would involve an API call to a backend service that handles the
    // mobile money provider's API, typically involving:
    // 1. Initiating a transaction with user's phone number.
    // 2. User confirms transaction on their phone.
    // 3. Backend receives webhook notification for success/failure.
    // 4. Backend updates user's subscription status in Supabase.
    // --- End Placeholder ---
  };

  if (authLoading || profileLoading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement de la page de tarification...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
              <Crown className="w-3 h-3 mr-2" />
              Accès Premium
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Passez au niveau <span className="gradient-text">Supérieur</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Débloquez des fonctionnalités avancées, des outils exclusifs et des guides détaillés
              pour une protection optimale.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-md p-8 bg-card rounded-lg shadow-xl border border-primary/20 flex flex-col items-center"
            >
              <Crown className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-2">Plan Premium</h2>
              <p className="text-5xl font-extrabold mb-4">3000<span className="text-xl font-medium">FCFA</span></p>
              <p className="text-muted-foreground mb-6 text-center">par mois</p>

              <ul className="text-left space-y-2 mb-8 w-full max-w-xs">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Accès illimité à tous les guides Premium
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Accès illimité à tous les outils Premium
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Rapports de scan détaillés et téléchargeables
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  Support prioritaire
                </li>
              </ul>

              <Button
                className="w-full mb-3 bg-gradient-to-r from-primary to-accent"
                size="lg"
                onClick={handleStripeCheckout}
                disabled={paymentProcessing || isSubscribed || !user}
              >
                {paymentProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Crown className="mr-2 h-4 w-4" />
                )}
                {isSubscribed ? 'Abonné' : 'S\'abonner via Stripe'}
              </Button>
              <Button
                className="w-full mb-3"
                variant="outline"
                size="lg"
                onClick={() => handleMobileMoneyPayment('MTN')}
                disabled={paymentProcessing || isSubscribed || !user}
              >
                Payer avec MTN Mobile Money
              </Button>
              <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => handleMobileMoneyPayment('OM')}
                disabled={paymentProcessing || isSubscribed || !user}
              >
                Payer avec Orange Money
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
