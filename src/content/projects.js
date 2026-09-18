// Project index — fully data-driven. The Work page and the project detail
// template both render entirely from this array. Add, remove or reorder
// projects freely; every field beyond `slug`, `title` and `category` is
// optional and the layout adapts when a field is missing.
//
// {
//   slug: string,             // used for /work/:slug — must be unique
//   title: string,
//   year: string,
//   category: string,         // free text — filters are generated from this
//   shortDescription: string, // shown in the index list
//   description: string,      // shown at the top of the detail page
//   image: string,            // optional — path under /src/assets or /public
//   tools: string[],
//   overview: string,
//   objective: string,
//   approach: string,
//   process: string,
//   outcome: string,
//   learnings: string,
//   links: { label: string, url: string }[],
// }

export const projects = [
  {
    slug: "project-one",
    title: "Project Title",
    year: "2026",
    category: "Engineering",
    shortDescription:
      "A short project description covering the problem and the shape of the work.",
    tools: ["CAD", "Python", "Simulation"],
    overview:
      "A brief overview of what this project is, who it was for, and the context it sits in.",
    objective:
      "The problem or question the project set out to address.",
    approach:
      "The method or reasoning used to move from problem to solution.",
    process:
      "Notable steps, iterations or decisions made along the way.",
    outcome:
      "What was produced, delivered or learned by the end of the project.",
    learnings:
      "A short reflection on what the project taught, technically or otherwise.",
    links: [{ label: "View repository", url: "https://github.com/" }],
  },
  {
    slug: "project-two",
    title: "Project Title",
    year: "2025",
    category: "Data",
    shortDescription:
      "A short project description covering the problem and the shape of the work.",
    tools: ["Python", "SQL", "Visualization"],
    overview:
      "A brief overview of what this project is, who it was for, and the context it sits in.",
    objective: "The problem or question the project set out to address.",
    approach: "The method or reasoning used to move from problem to solution.",
    outcome: "What was produced, delivered or learned by the end of the project.",
    links: [
      { label: "View repository", url: "https://github.com/" },
      { label: "Dataset", url: "https://example.com/" },
    ],
  },
  {
    slug: "project-three",
    title: "Project Title",
    year: "2025",
    category: "Research",
    shortDescription:
      "A short project description covering the problem and the shape of the work.",
    tools: ["LaTeX", "R"],
    overview:
      "A brief overview of what this project is, who it was for, and the context it sits in.",
    objective: "The question the research aimed to explore.",
    process: "An outline of the research process and methodology used.",
    outcome: "A summary of findings or conclusions.",
    learnings: "A short reflection on what the project taught.",
    links: [{ label: "Read paper", url: "https://example.com/" }],
  },
  {
    slug: "project-four",
    title: "Project Title",
    year: "2024",
    category: "Software",
    shortDescription:
      "A short project description covering the problem and the shape of the work.",
    tools: ["JavaScript", "React", "Node.js"],
    overview:
      "A brief overview of what this project is, who it was for, and the context it sits in.",
    approach: "The method or reasoning used to move from problem to solution.",
    process: "Notable steps, iterations or decisions made along the way.",
    outcome: "What was produced, delivered or learned by the end of the project.",
    links: [{ label: "Visit site", url: "https://example.com/" }],
  },
  {
    slug: "project-five",
    title: "Project Title",
    year: "2024",
    category: "Design",
    shortDescription:
      "A short project description covering the problem and the shape of the work.",
    tools: ["Figma"],
    overview:
      "A brief overview of what this project is, who it was for, and the context it sits in.",
    objective: "The problem or question the project set out to address.",
    outcome: "What was produced, delivered or learned by the end of the project.",
  },
];
