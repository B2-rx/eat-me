/* ==========================================================
   EAT ME : tout le contenu modifiable est ici.
   Modifiez, enregistrez, rechargez la page. Rien d'autre à toucher.
   ========================================================== */
window.EATME = {
  /* Contacts (source : informations fournies par le client) */
  tel: "076222195",               // utilisé par les boutons d'appel
  telAffiche: "076 22 21 95 ",      // texte affiché
  email: "Eatme.lbv@gmail.com",   // source : affiche de recrutement
  adresse: "Akanda, en face de la cité marocaine",  // source : affiche de recrutement
  ville: "Libreville, Gabon",
  maps: "https://www.google.com/maps/place/Eat+Me/@0.5221884,9.3814134,17.66z/data=!4m16!1m9!3m8!1s0x107ed70078362251:0x8b55dadd86e2dca2!2sEat+Me!8m2!3d0.5217552!4d9.3817955!9m1!1b1!16s%2Fg%2F11zf6jb1b0!3m5!1s0x107ed70078362251:0x8b55dadd86e2dca2!8m2!3d0.5217552!4d9.3817955!16s%2Fg%2F11zf6jb1b0?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D",
  tiktok: "https://www.tiktok.com/@eatme.lbv",

  /* ---------- RECRUTEMENT ---------- */
  recrutement: {
    recrute: true,   // true = annonce affichée | false = message de remplacement
    poste: "2 employé(e)s polyvalent(e)s",
    intro: "Pour renforcer notre équipe, Eat Me recherche des personnes motivées, dynamiques et souriantes.",
    missions: [
      "Accueillir et conseiller les clients avec chaleur",
      "Prendre les commandes et assurer un service de qualité",
      "Préparer et dresser nos créations gourmandes avec soin",
      "Veiller à la propreté et à la bonne organisation de l'espace",
      "Contribuer à offrir à chaque client une expérience agréable et mémorable"
    ],
    profil: [
      "Accueillant(e), sérieux(se) et ponctuel(le)",
      "À l'aise avec la clientèle",
      "Créatif(ve) et attentif(ve) aux détails",
      "Capable de travailler en équipe",
      "Motivé(e) à apprendre et à évoluer"
    ],
    note: "Une première expérience dans la restauration ou le service est appréciée, mais la motivation et le savoir-être feront la différence.",
    offre: [
      "Un environnement de travail stimulant et amical",
      "Des horaires flexibles",
      "Des opportunités de développement professionnel"
    ],
    postuler: "Envoyez votre CV et une lettre de motivation par e-mail, ou passez nous voir directement au restaurant avec votre candidature.",
    /* Message affiché quand recrute = false (texte proposé, à valider avec le client) */
    messageFerme: {
      titre: "Merci de votre intérêt",
      texte: "Notre équipe est au complet pour le moment. Votre démarche nous touche, et nous serons ravis de vous accueillir comme client. Retrouvez-nous sur TikTok pour suivre la vie de la maison."
    }
  },

  /* ---------- ÉVÉNEMENT (texte fondé sur l'affiche Octobre rose) ---------- */
  evenement: {
    accroche: "Soutenons la lutte contre le cancer du sein",
    texte: [
      "Octobre est le mois de la lutte contre le cancer du sein. Eat Me s'engage avec vous.",
      "Chaque gourmandise Pink aide à soutenir la cause.",
      "Venez partager un moment doux, seule, entre amis ou en équipe. Tous unis, un geste à la fois."
    ],
    dates: ""   // [À fournir par le client] ex. : "Du 1er au 31 octobre" (masqué si vide)
  }
};
