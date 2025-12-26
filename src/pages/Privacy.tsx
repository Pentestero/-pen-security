import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold mb-4">Politique de Confidentialité</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Dernière mise à jour : 26 décembre 2025</p>

          <h2>1. Collecte de l'information</h2>
          <p>
            Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, et/ou lorsque vous vous déconnectez.
            Les informations recueillies incluent votre adresse e-mail.
          </p>
          <p>
            En outre, nous recevons et enregistrons automatiquement des informations à partir de votre ordinateur et navigateur, y compris votre adresse IP,
            vos logiciels et votre matériel, et la page que vous demandez.
          </p>

          <h2>2. Utilisation des informations</h2>
          <p>
            Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
          </p>
          <ul>
            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
            <li>Fournir un contenu publicitaire personnalisé</li>
            <li>Améliorer notre site</li>
            <li>Améliorer le service client et vos besoins de prise en charge</li>
            <li>Vous contacter par e-mail</li>
          </ul>

          <h2>3. Confidentialité du commerce en ligne</h2>
          <p>
            Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues,
            échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est
            nécessaire pour répondre à une demande et / ou une transaction, comme par exemple pour expédier une commande.
          </p>
          
          {/* ... Ajoutez d'autres sections selon les besoins ... */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
