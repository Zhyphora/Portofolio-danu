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
    date: "2023-10-01",
    description:
      "Gugus Mitigasi Lebak Selatan (GMLS) is a community-based organization in Panggarangan Village, South Lebak, Banten, dedicated to disaster mitigation. Established on October 13, 2020, GMLS focuses on mitigation, preparedness, emergency response, and post-disaster recovery. Collaborating with 28 partners, GMLS has implemented the Tsunami Ready Program, meeting 12 indicators set by the International Oceanographic Commission UNESCO (IOC-UNESCO). Currently, GMLS is initiating a Community Resilience Program in South Lebak with collaborators and universities from various countries.",
    skills: [
      { id: 1, title: "NextJs" },
      { id: 1, title: "Chakra UI" },
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
    company: "PT Global Innovation Technology",
    date: "2023-01-01",
    description:
      "KejarTugas is a project management tool designed to streamline task assignments, set deadlines, notify team members, and monitor project progress within a single platform. It offers a comprehensive overview of tasks and projects, enhancing team collaboration and productivity.",
    skills: [
      { id: 1, title: "NextJs" },
      { id: 1, title: "Chakra UI" },
      { id: 2, title: "NodeJS" },
    ],
    type: "paid",
    link: "https://kejartugas.com",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1sFIS_hazQSbNEkzY9IrkQZU-TdhPwOy-", // Direct image link
  },
];
