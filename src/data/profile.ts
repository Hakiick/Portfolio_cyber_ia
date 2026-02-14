export interface ProfileData {
  pseudo: string;
  prenom: string;
  titre: string;
  sousTitre: string;
  bio: string;
  github: string;
  email: string;
  localisation: string;
}

export const profile: ProfileData = {
  pseudo: "Hakick",
  prenom: "Maxime",
  titre: "AI Security Engineer in the making",
  sousTitre: "Cloud · Cyber · IA Générative",
  bio: "Étudiant en dernière année à Epitech, spécialisé cloud computing et cybersécurité. Administrateur systèmes et réseaux avec un rôle de tech lead (backup, supervision, environnements critiques). Passionné par la sécurité des LLM, leur industrialisation et leur intégration en entreprise.",
  github: "https://github.com/juninhomax",
  email: "contact@hakick.dev",
  localisation: "France",
};
