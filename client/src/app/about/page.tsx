import Public_Footer from "@/components/layout/public/Public_Footer";
import Public_Header from "@/components/layout/public/Public_Header";

export default function page() {
  return (
    <div>
      <Public_Header />
      <main className="w-full text-center h-full p-6 px-0 mt-32">
        <div className="w-[60%] m-auto max-md:w-[80%]">
          <h1 className="text-4xl font-bold mb-8">About the developers</h1>
          <p>
            MochAPI was built with a simple vision: to make API prototyping
            effortless for developers. Created by me (Abrar Shahriar), MochAPI
            is designed to simplify API creation, testing, and
            integration—without the overhead of setting up a full backend.
          </p>
          <br />
          <p>
            With a background in full-stack development, I’ve worked on
            real-world projects where quickly setting up mock APIs was often a
            frustrating process. Seeing the need for a flexible and
            developer-friendly solution, I built MochAPI—a tool that lets users
            create, test, and manage APIs seamlessly.
          </p>
          <br />
          <p>At MochAPI, we are committed to:</p>
          <ul>
            <li>🚀 Making API development more accessible</li>
            <li>⚡ Providing intuitive and powerful features for developers</li>
            <li>🔍 Continuously improving based on community feedback</li>
          </ul>

          <br />
          <p>Join us on this journey and build better APIs, faster!</p>
        </div>
      </main>
      <Public_Footer />
    </div>
  );
}
