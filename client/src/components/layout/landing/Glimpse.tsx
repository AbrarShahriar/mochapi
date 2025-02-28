import GlimpseItem from "./GlimpseItem";

const glimpses: { title: string; desc: string; imgSrc: string }[] = [
  {
    title: "Organize and Manage Your API Projects",
    desc: "Create and manage multiple projects with ease. Generate endpoints, access your API key, and view all project data in one place.",
    imgSrc: "/images/project.png",
  },
  {
    title: "Manage Your API Endpoints with Ease",
    desc: "Create and configure mock API endpoints effortlessly. Define schemas, set responses, and deploy instantly—all in one place.",
    imgSrc: "/images/endpoint.png",
  },
  {
    title: "Customize APIs with Your Own Functions",
    desc: "View and manage your custom functions in one place. Extend your mock APIs with reusable logic tailored to your needs.",
    imgSrc: "/images/functions.png",
  },
  {
    title: "Write and Test Custom Functions",
    desc: "Create custom functions to shape your API responses. Write, test, and refine your logic directly within MochAPI.",
    imgSrc: "/images/write-function.png",
  },
  {
    title: "Monitor API Activity in Real Time",
    desc: "Track API requests with detailed logs and insights. See who sent requests, view response data, and analyze request trends with a 7-day activity chart.",
    imgSrc: "/images/observability.png",
  },
];

export default function Glimpse() {
  return (
    <div className="flex flex-col gap-32">
      {glimpses.map((glimpse, i) => (
        <GlimpseItem key={i} index={i + 1} {...glimpse} />
      ))}
    </div>
  );
}
