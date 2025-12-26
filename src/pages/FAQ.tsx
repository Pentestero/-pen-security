import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqData } from "@/data/faqData";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
            <HelpCircle className="w-3 h-3 mr-2" />
            Foire Aux Questions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Questions <span className="gradient-text">Fréquemment</span> Posées
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trouvez ici les réponses aux questions les plus courantes sur notre plateforme et nos services.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem value={`item-${item.id}`}>
                  <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
