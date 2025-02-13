// experiences.ts
export type Experience = {
  id: number;
  title: string;
  company: string;
  date: string;
  description: string;
  skills?: { id: number; title: string }[];
  type: "work" | "education";
};

export const experiences: Experience[] = [
  {
    id: 1,
    title: "IT Intern",
    company: "PT Karya Solusi Prima Sejahtera",
    date: "Sept 2024 - Present",
    description:
      "Contributing to the development of a scalable Human Resource Information System (HRIS) web application using Laravel and PHP. Responsible for implementing core features, optimizing database queries, and ensuring a seamless user experience.",
    skills: [
      { id: 1, title: "PHP" },
      { id: 2, title: "Laravel" },
      { id: 3, title: "Docker" },
    ],
    type: "work",
  },
  {
    id: 2,
    title: "Remote AI Trainer for Indonesian Writers",
    company: "Outlier",
    date: "Sept 2024 - Present",
    description:
      "Providing high-quality training data for AI models by curating, reviewing, and refining prompts to improve language generation and contextual accuracy.",
    skills: [{ id: 1, title: "Prompt Engineering" }],
    type: "work",
  },
  {
    id: 3,
    title: "Technical Consultant",
    company: "PT Global Information Technology",
    date: "Jan - July 2024",
    description:
      "Worked as a frontend developer specializing in NextJS to build interactive user interfaces. Assisted in IT operations, security implementation, and Splunk-based monitoring solutions.",
    skills: [
      { id: 1, title: "Splunk" },
      { id: 2, title: "IT Operations" },
      { id: 3, title: "IT Security" },
      { id: 4, title: "Next.js" },
      { id: 5, title: "META Development" },
    ],
    type: "work",
  },
  {
    id: 4,
    title: "Bachelor’s Degree in Informatics",
    company: "Universitas Multimedia Nusantara",
    date: "Aug 2021 - Present",
    description:
      "Pursuing a degree in Informatics, with a focus on algorithms, data structures, software engineering, and cybersecurity. Engaged in various projects involving web development, machine learning, and IT security.",
    type: "education",
  },
];
