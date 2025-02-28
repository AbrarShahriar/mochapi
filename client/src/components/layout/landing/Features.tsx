import { ElementType } from "react";
import FeatureCard from "./FeatureCard";
import {
  ChartBar,
  FileText,
  FunctionSquare,
  Rocket,
  ServerCog,
  ShieldCheck,
} from "lucide-react";

const features: {
  title: string;
  desc: string;
  points: string[];
  Icon: ElementType;
}[] = [
  {
    title: "Instant API Creation",
    desc: "Quickly generate API endpoints without writing backend code. Define schemas and deploy in seconds.",
    points: [
      "No backend knowledge required—just configure and go.",
      "Create endpoints in seconds with an intuitive UI.",
      "Get a live, ready-to-use API URL instantly.",
    ],
    Icon: Rocket,
  },
  {
    title: "Prebuilt & Custom Functions",
    desc: `Use built-in functions or create custom functions to generate dynamic responses.`,
    points: [
      "Built-in utilities for timestamps, UUIDs, names, and more.",
      "Define custom logic to tailor responses as needed.",
      "Extend functionality without complex coding.",
    ],
    Icon: FunctionSquare,
  },
  {
    title: "Mock Realistic Data",
    desc: `Simulate real-world API responses with structured, customizable mock data for testing and development.`,
    points: [
      "Generate dynamic responses with varied data types.",
      "Supports nested objects and relational structures.",
      "Mimic real-world API behaviors with controlled randomness.",
    ],
    Icon: FileText,
  },
  {
    title: "Live Request Analytics",
    desc: `Track API usage with real-time request logs, response times, and request counts per endpoint.`,
    points: [
      "View detailed request history and response times.",
      "Analyze API traffic patterns to optimize testing.",
      "Lightweight logging without database storage.",
    ],
    Icon: ChartBar,
  },
  {
    title: "In-Browser API Playground",
    desc: `Test your endpoints directly from the browser by pasting a URL and API key—no external tools required.`,
    points: [
      "Instantly preview responses within the app.",
      "Test various request parameters with ease.",
      "No Postman or external tools needed.",
    ],
    Icon: ServerCog,
  },
  {
    title: " Secure & Private API Mocking",
    desc: `Keep your mock APIs private and access-controlled.`,
    points: [
      "API key authentication for secure access.",
      "Restrict endpoints to specific users or teams.",
      "No persistent data storage—requests auto-expire.",
    ],
    Icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="grid grid-cols-3 gap-8">
      {features.map((feature, i) => (
        <FeatureCard key={i} index={i + 1} {...feature} />
      ))}
    </section>
  );
}
