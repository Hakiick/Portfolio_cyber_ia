export type CertificationStatus = "obtained" | "in-progress" | "preparing";

export interface Certification {
  nom: string;
  organisme: string;
  status: CertificationStatus;
  description: string;
  descriptionEn?: string;
  progress: number;
}

export const certifications: Certification[] = [
  {
    nom: "eJPTv2",
    organisme: "INE Security",
    status: "obtained",
    description: "Junior Penetration Tester",
    descriptionEn: "Junior Penetration Tester",
    progress: 100,
  },
  {
    nom: "AZ-900",
    organisme: "Microsoft",
    status: "preparing",
    description: "Azure Fundamentals",
    descriptionEn: "Azure Fundamentals",
    progress: 20,
  },
  {
    nom: "AWS Cloud Practitioner",
    organisme: "AWS",
    status: "preparing",
    description: "Cloud Fundamentals",
    descriptionEn: "Cloud Fundamentals",
    progress: 15,
  },
  {
    nom: "AWS AI Practitioner",
    organisme: "AWS",
    status: "in-progress",
    description: "AI/ML Fundamentals",
    descriptionEn: "AI/ML Fundamentals",
    progress: 60,
  },
];
