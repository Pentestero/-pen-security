interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: '1',
    question: "Qu'est-ce que PEN et à qui s'adresse-t-il ?",
    answer: "PEN (Protection & Éducation Numérique) est une plateforme visant à rendre la cybersécurité accessible à tous au Cameroun et ailleurs. Elle s'adresse aux particuliers, aux étudiants, et aux PME qui souhaitent comprendre et se protéger contre les menaces numériques."
  },
  {
    id: '2',
    question: "Le scanner de liens est-il vraiment gratuit ?",
    answer: "Oui, notre scanner de liens est 100% gratuit et ne nécessite aucune inscription. Vous pouvez l'utiliser pour analyser autant de liens que vous le souhaitez."
  },
  {
    id: '3',
    question: "Comment puis-je être sûr que les outils proposés sont sécurisés ?",
    answer: "Chaque outil que nous proposons est vérifié par notre équipe. Nous recommandons principalement des logiciels open-source reconnus et respectés par la communauté de la cybersécurité mondiale."
  },
  {
    id: '4',
    question: "Quels sont les avantages de l'abonnement Premium ?",
    answer: "L'abonnement Premium vous donne accès à des guides plus détaillés, des outils avancés, et des rapports d'analyse de liens plus complets. Il vous permet également de soutenir notre mission de rendre la cybersécurité accessible à tous."
  },
  {
    id: '5',
    question: "Comment puis-je suggérer un nouvel outil ou un nouveau guide ?",
    answer: "Nous sommes toujours ouverts aux suggestions ! Vous pouvez nous contacter via l'adresse e-mail fournie dans le pied de page du site. Nous serons ravis d'étudier votre proposition."
  }
];
