export type CertificationStatus = "obtained" | "in-progress" | "preparing";

export interface Certification {
  nom: string;
  organisme: string;
  status: CertificationStatus;
  description: string;
  descriptionEn?: string;
  progress: number;
  image: string;
}

export const certifications: Certification[] = [
  {
    nom: "eJPTv2",
    organisme: "INE Security",
    status: "obtained",
    description: "Junior Penetration Tester",
    descriptionEn: "Junior Penetration Tester",
    progress: 100,
    image: "/images/certs/ejptv2.svg",
  },
  {
    nom: "AZ-900",
    organisme: "Microsoft",
    status: "preparing",
    description: "Azure Fundamentals",
    descriptionEn: "Azure Fundamentals",
    progress: 20,
    image: "/images/certs/az900.svg",
  },
  {
    nom: "AWS Cloud Practitioner",
    organisme: "AWS",
    status: "obtained",
    description: "Cloud Fundamentals",
    descriptionEn: "Cloud Fundamentals",
    progress: 100,
    image: "/images/certs/aws-cp.svg",
  },
  {
    nom: "AWS AI Practitioner",
    organisme: "AWS",
    status: "in-progress",
    description: "AI/ML Fundamentals",
    descriptionEn: "AI/ML Fundamentals",
    progress: 60,
    image: "/images/certs/aws-ai.svg",
  },
];
