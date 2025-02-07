"use client";

import { useState } from "react";

const dummuProject = {
  id: "fsijfaififiashfish",
  name: "Test API",
  apiKey: "ihefheihihr",
  routes: [
    {
      name: "movies",
      isPublic: true,
      schema: JSON.stringify({
        firstName: "faker:name",
        lastName: "faker:name",
        age: "faker:age",
      }),
      generatedData: JSON.stringify([
        {
          firstName: "Abrar",
          lastName: "Shahriar",
          age: 22,
        },
        {
          firstName: "Tahia",
          lastName: "Azam",
          age: 21,
        },
      ]),
    },
  ],
  numOfRows: 2,
  createdAt: new Date("2024-8-10"),
  updatedAt: new Date("2025-2-4"),
};

export default function Page({ params }: { params: { projectId: string } }) {
  const [project, setProject] = useState(dummuProject);

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <p className="mb-8 text-white/70">
        Manage your project, routes, schemas and generated data.
      </p>

      <div></div>
    </main>
  );
}
