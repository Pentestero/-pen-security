import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, Sparkles, Shield, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowingCard from "@/components/ui/GlowingCard";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  "Comment protéger mon mot de passe?",
  "Qu'est-ce que le phishing?",
  "Comment sécuriser mon WiFi?",
  "C'est quoi un VPN?",
];

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Bonjour! 👋 Je suis votre assistant cybersécurité PEN. Posez-moi n'importe quelle question sur la sécurité informatique, je vous répondrai en français simple et adapté au contexte camerounais.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      "mot de passe": "Pour un mot de passe sécurisé: utilisez au moins 12 caractères, mélangez majuscules, minuscules, chiffres et symboles. Évitez les informations personnelles. Utilisez un gestionnaire comme Bitwarden (gratuit).",
      "phishing": "Le phishing est une technique où des arnaqueurs se font passer pour des entreprises légitimes (Orange, MTN, banques) pour voler vos informations. Ne cliquez jamais sur les liens dans les SMS ou emails suspects!",
      "wifi": "Pour sécuriser votre WiFi: changez le mot de passe par défaut, utilisez WPA3 ou WPA2, cachez le nom du réseau (SSID), et mettez à jour régulièrement votre box internet.",
      "vpn": "Un VPN chiffre votre connexion internet et masque votre adresse IP. C'est utile pour protéger vos données sur les WiFi publics. ProtonVPN offre une version gratuite et fiable.",
    };

    let response = "Je comprends votre question. Pour une réponse plus précise, pouvez-vous me donner plus de détails? En attendant, je vous conseille de consulter nos guides pratiques pour des informations détaillées sur la cybersécurité.";
    
    for (const [keyword, answer] of Object.entries(responses)) {
      if (input.toLowerCase().includes(keyword)) {
        response = answer;
        break;
      }
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
              <Bot className="w-3 h-3 mr-2" />
              IA Assistant
            </Badge>
            <h1 className="text-4xl font-display font-bold mb-4">
              Assistant <span className="gradient-text">Cybersécurité</span>
            </h1>
            <p className="text-muted-foreground">Posez vos questions, obtenez des réponses claires et adaptées au Cameroun</p>
          </motion.div>

          <GlowingCard className="p-0 overflow-hidden">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "")}
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", msg.role === "user" ? "bg-primary/10" : "bg-accent/10")}>
                    {msg.role === "user" ? <User className="w-5 h-5 text-primary" /> : <Bot className="w-5 h-5 text-accent" />}
                  </div>
                  <div className={cn("max-w-[80%] p-4 rounded-2xl", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary")}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-accent" />
                  </div>
                  <div className="bg-secondary p-4 rounded-2xl">
                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-6 py-3 border-t border-border/50 flex gap-2 overflow-x-auto">
              {suggestions.map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => setInput(s)} className="whitespace-nowrap text-xs">
                  <HelpCircle className="w-3 h-3 mr-1" />
                  {s}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50">
              <div className="flex gap-2">
                <Input
                  placeholder="Posez votre question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="h-12"
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="h-12 px-6 bg-gradient-to-r from-primary to-accent">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </GlowingCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Assistant;
