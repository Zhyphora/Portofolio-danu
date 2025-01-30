export type Projects = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills?: { id: number; title: string }[];
  type: "paid" | "personal";
  link: string;
  imageUrl: string;
};

export const projects: Projects[] = [
  {
    id: 1,
    title: "GMLS",
    company: "",
    date: "2023-01-01",
    description: "This is a description for Project 1.",
    skills: [
      { id: 1, title: "NextJs" },
      { id: 2, title: "NodeJS" },
    ],
    type: "paid",
    link: "https://gmls.org",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1X-0SAOrTPq3UJt-GbbchLU5tH77-dI-w", // Direct image link
  },
  {
    id: 2,
    title: "KejarTugas",
    company: "",
    date: "2023-01-01",
    description: "This is a description for Project 1.",
    skills: [
      { id: 1, title: "NextJs" },
      { id: 2, title: "NodeJS" },
    ],
    type: "paid",
    link: "https://kejartugas.com",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1sFIS_hazQSbNEkzY9IrkQZU-TdhPwOy-", // Direct image link
  },
];
