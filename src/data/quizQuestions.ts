interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: "Quelle est la principale différence entre le chiffrement symétrique et asymétrique ?",
    options: [
      "Le chiffrement symétrique utilise une seule clé pour chiffrer et déchiffrer, tandis que l'asymétrique utilise deux clés différentes (publique/privée).",
      "Le chiffrement asymétrique est plus rapide que le symétrique.",
      "Le chiffrement symétrique est utilisé pour la signature numérique, l'asymétrique pour la confidentialité.",
      "Il n'y a pas de différence fondamentale, seulement des applications différentes."
    ],
    correctAnswer: "Le chiffrement symétrique utilise une seule clé pour chiffrer et déchiffrer, tandis que l'asymétrique utilise deux clés différentes (publique/privée).",
    explanation: "Le chiffrement symétrique (comme AES) est rapide et utilise la même clé pour les deux opérations. Le chiffrement asymétrique (comme RSA) utilise une clé publique pour chiffrer et une clé privée correspondante pour déchiffrer, offrant une sécurité accrue pour l'échange de clés et la signature numérique."
  },
  {
    id: '2',
    question: "Qu'est-ce que l'ingénierie sociale dans le contexte de la cybersécurité ?",
    options: [
      "L'utilisation de techniques sophistiquées pour briser les codes de chiffrement.",
      "L'exploitation des failles techniques d'un système informatique pour obtenir un accès non autorisé.",
      "L'art de manipuler des individus pour obtenir des informations confidentielles ou les pousser à effectuer des actions spécifiques.",
      "La conception de logiciels malveillants très complexes pour infecter les réseaux."
    ],
    correctAnswer: "L'art de manipuler des individus pour obtenir des informations confidentielles ou les pousser à effectuer des actions spécifiques.",
    explanation: "L'ingénierie sociale repose sur la psychologie humaine plutôt que sur les vulnérabilités techniques. Elle vise à tromper les gens (par exemple, via le phishing ou le pretexting) pour qu'ils divulguent des informations ou donnent accès à des systèmes."
  },
  {
    id: '3',
    question: "Quelle est la fonction principale d'un pare-feu (firewall) ?",
    options: [
      "Analyser et supprimer les virus des fichiers téléchargés.",
      "Crypter toutes les communications réseau sortantes.",
      "Surveiller et contrôler le trafic réseau entrant et sortant en fonction de règles de sécurité prédéfinies.",
      "Créer des sauvegardes automatiques des données sensibles."
    ],
    correctAnswer: "Surveiller et contrôler le trafic réseau entrant et sortant en fonction de règles de sécurité prédéfinies.",
    explanation: "Un pare-feu agit comme une barrière entre un réseau interne sécurisé et des réseaux externes non fiables (comme Internet). Il filtre le trafic pour bloquer les accès non autorisés et protéger le système contre les menaces."
  },
  {
    id: '4',
    question: "Qu'est-ce qu'une attaque 'Man-in-the-Middle' (MitM) ?",
    options: [
      "Une attaque où un pirate modifie le code source d'un logiciel avant sa distribution.",
      "Une attaque où un attaquant intercepte et potentiellement modifie la communication entre deux parties sans que celles-ci ne s'en aperçoivent.",
      "Une attaque qui submerge un serveur avec un volume de trafic énorme pour le rendre indisponible.",
      "Une attaque qui consiste à deviner le mot de passe d'un utilisateur par essais successifs."
    ],
    correctAnswer: "Une attaque où un attaquant intercepte et potentiellement modifie la communication entre deux parties sans que celles-ci ne s'en aperçoivent.",
    explanation: "Dans une attaque MitM, l'attaquant se place secrètement entre deux parties qui communiquent. Chaque partie pense communiquer directement avec l'autre, alors que l'attaquant intercepte tout le flux de données, pouvant les lire ou les modifier."
  },
  {
    id: '5',
    question: "Pour une PME au Cameroun, quelle est la première étape la plus cruciale pour se protéger contre les ransomwares ?",
    options: [
      "Payer la rançon immédiatement pour récupérer les données.",
      "Installer le meilleur antivirus du marché.",
      "Avoir des sauvegardes régulières, testées et déconnectées du réseau principal.",
      "Engager un hacker éthique pour attaquer l'entreprise en premier."
    ],
    correctAnswer: "Avoir des sauvegardes régulières, testées et déconnectées du réseau principal.",
    explanation: "Bien que tous les points soient pertinents, des sauvegardes fiables et hors ligne sont la seule garantie de pouvoir restaurer les données sans payer la rançon, ce qui est la défense la plus efficace."
  },
  {
    id: '6',
    question: "Quel règlement européen, ayant un impact mondial sur la protection des données, les entreprises (même camerounaises) doivent-elles souvent respecter si elles traitent des données de citoyens européens ?",
    options: [
      "HIPAA",
      "Le RGPD (Règlement Général sur la Protection des Données)",
      "La loi POPI",
      "Le 'Cybersecurity Act'"
    ],
    correctAnswer: "Le RGPD (Règlement Général sur la Protection des Données)",
    explanation: "Le RGPD a une portée extraterritoriale. Toute entreprise dans le monde qui traite les données personnelles de résidents de l'UE doit s'y conformer, sous peine de lourdes amendes."
  },
  {
    id: '7',
    question: "Qu'est-ce qu'une attaque par hameçonnage (phishing) ?",
    options: [
      "Une tentative d'hameçonner les données en utilisant un faux site web qui ressemble à un site légitime.",
      "Une attaque qui inonde un serveur de requêtes pour le rendre indisponible.",
      "Un logiciel qui enregistre toutes les frappes du clavier.",
      "Un virus qui se propage automatiquement sur un réseau."
    ],
    correctAnswer: "Une tentative d'hameçonner les données en utilisant un faux site web qui ressemble à un site légitime.",
    explanation: "Le phishing est une forme d'ingénierie sociale où l'attaquant envoie des communications (souvent des e-mails) se faisant passer pour une entité de confiance afin de voler des informations sensibles comme des mots de passe ou des numéros de carte de crédit."
  },
  {
    id: '8',
    question: "Pourquoi est-il déconseillé d'utiliser le même mot de passe pour plusieurs services en ligne ?",
    options: [
      "C'est plus difficile à retenir.",
      "Les sites web interdisent cette pratique dans leurs conditions d'utilisation.",
      "Si un site est piraté, les attaquants peuvent utiliser ce même mot de passe pour accéder à vos autres comptes.",
      "Cela ralentit la vitesse de connexion aux sites web."
    ],
    correctAnswer: "Si un site est piraté, les attaquants peuvent utiliser ce même mot de passe pour accéder à vos autres comptes.",
    explanation: "Cette technique, appelée 'credential stuffing', est très courante. Une fuite de données sur un seul site peut compromettre tous vos autres comptes si vous réutilisez le même mot de passe."
  },
  {
    id: '9',
    question: "Au Cameroun, les paiements par 'Mobile Money' sont très populaires. Quel est le risque de sécurité le plus courant associé ?",
    options: [
      "La duplication de la carte SIM.",
      "Les arnaques par ingénierie sociale (faux messages de gain, demande d'aide urgente, etc.) pour vous faire envoyer de l'argent.",
      "Le piratage direct des serveurs de l'opérateur mobile.",
      "La perte de signal réseau pendant une transaction."
    ],
    correctAnswer: "Les arnaques par ingénierie sociale (faux messages de gain, demande d'aide urgente, etc.) pour vous faire envoyer de l'argent.",
    explanation: "La grande majorité des fraudes liées au Mobile Money repose sur la manipulation psychologique de la victime pour qu'elle autorise elle-même une transaction ou divulgue son code secret."
  },
  {
    id: '10',
    question: "Quelle est l'utilité de l'Authentification à Deux Facteurs (2FA) ?",
    options: [
      "Rendre les mots de passe deux fois plus longs.",
      "Ajouter une deuxième couche de sécurité en plus du mot de passe, généralement un code temporaire.",
      "Se connecter à deux comptes en même temps.",
      "Chiffrer les données deux fois."
    ],
    correctAnswer: "Ajouter une deuxième couche de sécurité en plus du mot de passe, généralement un code temporaire.",
    explanation: "Le 2FA (ou MFA) ajoute une étape de vérification (quelque chose que vous possédez, comme votre téléphone, ou que vous êtes, comme une empreinte digitale) en plus de votre mot de passe (quelque chose que vous savez), rendant l'accès à votre compte beaucoup plus difficile pour un pirate."
  }
];
