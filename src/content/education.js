// Education timeline. Renders automatically — add, remove or reorder
// entries freely. Only `id`, `institution` and `degree` are required.
//
// {
//   id: string,
//   institution: string,
//   degree: string,
//   startYear: string,
//   endYear: string,        // optional — omit or use "Present"
//   description: string,    // optional
//   location: string,       // optional
//   interests: string[],    // optional
// }

export const education = [
  {
    id: "edu-1",
    institution: "INSTITUTION NAME",
    degree: "PROGRAM / DEGREE",
    startYear: "2026",
    endYear: "Present",
    location: "City, Country",
    description:
      "A short description of the program, focus areas or coursework relevant to the work shown on this site.",
    interests: ["Applied computation", "Systems design"],
  },
  {
    id: "edu-2",
    institution: "INSTITUTION NAME",
    degree: "PROGRAM / DEGREE",
    startYear: "2022",
    endYear: "2026",
    location: "City, Country",
    description:
      "A short description of the program, focus areas or coursework relevant to the work shown on this site.",
    interests: ["Mathematics", "Research methods"],
  },
  {
    id: "edu-3",
    institution: "INSTITUTION NAME",
    degree: "PROGRAM / DEGREE",
    startYear: "2020",
    endYear: "2022",
    location: "City, Country",
    description: "A short description of earlier study or foundation years.",
  },
];
