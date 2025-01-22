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
    imageUrl: "",
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
    imageUrl: "",
  },
  {
    id: 3,
    title: "KidsHub",
    company: "",
    date: "2023-02-01",
    description: "This is a description for Project 2.",
    skills: [{ id: 1, title: "Kotlin" }],
    type: "personal",
    link: "https://github.com/Universitas-Multimedia-Nusantara/kidshub-app",
    imageUrl: "",
  },
];
