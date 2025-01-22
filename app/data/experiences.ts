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
    title: "IT Internship",
    company: "PT Karya Solusi Prima Sejahtera",
    date: "Sept 2024 - Present",
    description:
      "Developing scalable web applications using React and Node.js.",
    skills: [
      {
        id: 1,
        title: "PHP",
      },
      {
        id: 2,
        title: "Laravel",
      },
      {
        id: 3,
        title: "Docker",
      },
    ],
    type: "work",
  },
  {
    id: 2,
    title: "Remote AI Trainer for Indonesian writers",
    company: "Outlier",
    date: "Sept 2024 - Present",
    description:
      "Developing scalable web applications using React and Node.js.",
    skills: [
      {
        id: 1,
        title: "Prompt Engineering",
      },
    ],
    type: "work",
  },
  {
    id: 3,
    title: "Techincal Consultant",
    company: "PT Global Information Technology",
    date: "Jan - July 2024",
    description: "Worked on frontend development using React and Redux.",
    skills: [
      {
        id: 1,
        title: "Splunk",
      },
      {
        id: 2,
        title: "IT Operation",
      },
      {
        id: 3,
        title: "IT Security",
      },
      {
        id: 4,
        title: "NextJS",
      },
      {
        id: 5,
        title: "META Development",
      },
    ],
    type: "work",
  },
  {
    id: 4,
    title: "Informatics Degree",
    company: "Universitas Multimedia Nusantara",
    date: "Aug 2021 - Present",
    description:
      "Studied algorithms, data structures, and software engineering principles.",
    type: "education",
  },
];
