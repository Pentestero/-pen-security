import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Key, Shield, Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlowingCard from "@/components/ui/GlowingCard";
import { cn } from "@/lib/utils";

const Lab = () => {
  const [password, setPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [copied, setCopied] = useState(false);

  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabels = ["Très faible", "Faible", "Moyen", "Fort", "Très fort"];
  const strengthColors = ["bg-destructive", "bg-warning", "bg-warning", "bg-accent", "bg-safe-green"];

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*";
    let pwd = "";
    for (let i = 0; i < length[0]; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(pwd);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
              <FlaskConical className="w-3 h-3 mr-2" />
              Lab Interactif
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Testez votre <span className="gradient-text">sécurité</span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Password Strength Tester */}
            <GlowingCard>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold">Testeur de mot de passe</h3>
              </div>
              <Input
                type="text"
                placeholder="Entrez un mot de passe..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={cn("h-2 flex-1 rounded-full", i < strength ? strengthColors[strength - 1] : "bg-secondary")} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Force: <span className={cn("font-semibold", strength > 2 ? "text-safe-green" : "text-warning")}>{strengthLabels[strength] || "Entrez un mot de passe"}</span>
                </p>
              </div>
            </GlowingCard>

            {/* Password Generator */}
            <GlowingCard glowColor="accent">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold">Générateur sécurisé</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Longueur: {length[0]} caractères</label>
                  <Slider value={length} onValueChange={setLength} min={8} max={32} step={1} />
                </div>
                <Button onClick={generatePassword} className="w-full bg-gradient-to-r from-primary to-accent">
                  <RefreshCw className="w-4 h-4 mr-2" /> Générer
                </Button>
                {generatedPassword && (
                  <div className="flex gap-2">
                    <Input value={generatedPassword} readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon" onClick={copyPassword}>
                      {copied ? <Check className="w-4 h-4 text-safe-green" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
              </div>
            </GlowingCard>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lab;
