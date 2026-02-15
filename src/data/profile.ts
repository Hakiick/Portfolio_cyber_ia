export interface ProfileData {
  pseudo: string;
  prenom: string;
  titre: string;
  titreEn?: string;
  sousTitre: string;
  sousTitreEn?: string;
  bio: string;
  bioEn?: string;
  github: string;
  email: string;
  localisation: string;
}

export const profile: ProfileData = {
  pseudo: "Hakick",
  prenom: "Maxime",
  titre: "AI Security Engineer in the making",
  titreEn: "AI Security Engineer in the making",
  sousTitre: "Cloud · Cyber · IA Générative",
  sousTitreEn: "Cloud · Cyber · Generative AI",
  bio: "Étudiant en dernière année à Epitech, spécialisé cloud computing et cybersécurité. Administrateur systèmes et réseaux avec un rôle de tech lead (backup, supervision, environnements critiques). Passionné par la sécurité des LLM, leur industrialisation et leur intégration en entreprise.",
  bioEn:
    "Final-year student at Epitech, specialized in cloud computing and cybersecurity. Systems and network administrator with a tech lead role (backup, monitoring, critical environments). Passionate about LLM security, industrialization, and enterprise integration.",
  github: "https://github.com/juninhomax",
  email: "contact@hakick.dev",
  localisation: "France",
};
