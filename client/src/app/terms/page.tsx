import Public_Footer from "@/components/layout/public/Public_Footer";
import Public_Header from "@/components/layout/public/Public_Header";

export default function termsofservice() {
  return (
    <div>
      <Public_Header />
      <main className="w-full h-full p-6 px-0 mt-32">
        <div className="w-[60%] m-auto max-md:w-[80%] leading-7">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Terms of Service
          </h1>
          <p className="text-lg mb-4">
            <strong>Effective Date:</strong> 7 Mar, 2025
          </p>

          <p className="mb-4">
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of our services (&quot;the Service&quot;). By using the Service,
            you agree to comply with and be bound by these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            1. User Registration
          </h2>
          <p className="mb-4">
            You must create an account with Clerk for authentication in order to
            access and use the Service. By creating an account, you agree to
            provide accurate and complete information, including your email
            address.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            2. Use of the Service
          </h2>
          <p className="mb-4">
            You may use the Service to create projects, endpoints, and custom
            functions. You are solely responsible for the data generated and
            stored through your use of the Service, including any functions you
            create.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">3. API Access</h2>
          <p className="mb-4">
            You can make your APIs publicly accessible, but anyone accessing
            your API must provide a token. We do not provide API tokens and are
            not responsible for the usage of your API.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            4. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Content:</strong> You are responsible for the content
              generated and shared through the Service. You may not use the
              Service to create illegal, harmful, or malicious content.
            </li>
            <li>
              <strong>Data Protection:</strong> You are responsible for ensuring
              that any data you store complies with applicable data protection
              regulations.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            5. Service Availability
          </h2>
          <p className="mb-4">
            The Service is provided &quot;as is,&quot; and we do not guarantee
            its availability or uninterrupted access. We may modify, suspend, or
            discontinue the Service at any time.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            6. Data Retention and Deletion
          </h2>
          <p className="mb-4">
            Your projects and endpoints are retained indefinitely unless you
            choose to delete them. When you delete a project, all associated
            data is permanently removed. API usage logs are retained for 7 days.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">7. Termination</h2>
          <p className="mb-4">
            We reserve the right to suspend or terminate your access to the
            Service if you violate these Terms.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            8. Limitation of Liability
          </h2>
          <p className="mb-4">
            We are not liable for any direct or indirect damages arising from
            your use of the Service, including data loss or interruptions to the
            Service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            9. Changes to Terms
          </h2>
          <p className="mb-4">
            We may update these Terms from time to time. The updated version
            will be posted on this page with an updated effective date.
          </p>
        </div>
      </main>
      <Public_Footer />
    </div>
  );
}
