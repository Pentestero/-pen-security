import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-4">Conditions d'Utilisation</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Dernière mise à jour : 26 décembre 2025</p>

          <h2>1. Introduction</h2>
          <p>
            Bienvenue sur PEN. En accédant à notre site web, vous acceptez d'être lié par ces conditions d'utilisation,
            toutes les lois et réglementations applicables, et vous acceptez d'être responsable du respect des lois locales applicables.
            Si vous n'êtes pas d'accord avec l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site.
          </p>

          <h2>2. Utilisation de la Licence</h2>
          <p>
            La permission est accordée de télécharger temporairement une copie du matériel (information ou logiciel) sur le site web de PEN
            pour une visualisation transitoire personnelle et non commerciale uniquement. Ceci est l'octroi d'une licence, pas un transfert de titre,
            et sous cette licence, vous ne pouvez pas :
          </p>
          <ul>
            <li>modifier ou copier le matériel ;</li>
            <li>utiliser le matériel à des fins commerciales, ou pour toute présentation publique (commerciale ou non commerciale) ;</li>
            <li>tenter de décompiler ou de désassembler tout logiciel contenu sur le site web de PEN ;</li>
            <li>supprimer toute mention de droit d'auteur ou autre mention de propriété du matériel ; ou</li>
            <li>transférer le matériel à une autre personne ou "refléter" le matériel sur un autre serveur.</li>
          </ul>

          <h2>3. Clause de non-responsabilité</h2>
          <p>
            Le matériel sur le site web de PEN est fourni "tel quel". PEN ne donne aucune garantie, expresse ou implicite, et
            décline et annule par la présente toutes les autres garanties, y compris, sans s'y limiter, les garanties implicites ou les conditions de
            qualité marchande, d'adéquation à un usage particulier, ou de non-violation de la propriété intellectuelle ou autre violation des droits.
          </p>

          {/* ... Ajoutez d'autres sections selon les besoins ... */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
