export type CertificationStatus = "obtained" | "in-progress" | "preparing";

export interface Certification {
  nom: string;
  organisme: string;
  status: CertificationStatus;
  description: string;
}

export const certifications: Certification[] = [
  {
    nom: "eJPTv2",
    organisme: "INE Security",
    status: "obtained",
    description: "Junior Penetration Tester",
  },
  {
    nom: "AZ-900",
    organisme: "Microsoft",
    status: "preparing",
    description: "Azure Fundamentals",
  },
  {
    nom: "AWS Cloud Practitioner",
    organisme: "AWS",
    status: "preparing",
    description: "Cloud Fundamentals",
  },
  {
    nom: "AWS AI Practitioner",
    organisme: "AWS",
    status: "in-progress",
    description: "AI/ML Fundamentals",
  },
];
