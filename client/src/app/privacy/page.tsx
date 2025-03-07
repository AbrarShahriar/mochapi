import Public_Footer from "@/components/layout/public/Public_Footer";
import Public_Header from "@/components/layout/public/Public_Header";

export default function privacypolicy() {
  return (
    <div>
      <Public_Header />
      <main className="w-full h-full p-6 px-0 mt-32">
        <div className="w-[60%] m-auto max-md:w-[80%] leading-7">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg mb-4">
            <strong>Effective Date:</strong> 7 Mar, 2025
          </p>

          <p className="mb-4">
            This Privacy Policy explains how we collect, use, and protect your
            personal data when you use our services. By accessing or using our
            services, you agree to the collection and use of information in
            accordance with this policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Email Address:</strong> This is collected during
              authentication using Clerk for the purpose of identifying and
              associating your projects, endpoints, and functions with your
              account.
            </li>
            <li>
              <strong>Profile Picture:</strong> If you log in using Google or
              GitHub, we access your public profile picture associated with your
              account.
            </li>
            <li>
              <strong>Usage Data:</strong> We track how often your API routes
              are accessed, the region of the visitor, and the user agent. This
              information helps you see the usage statistics of your APIs.
            </li>
            <li>
              <strong>IP Address:</strong> Your IP address is temporarily stored
              in Redis to log access to your API routes.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Authentication:</strong> To verify your identity and
              associate projects, endpoints, and functions with your account.
            </li>
            <li>
              <strong>Service Functionality:</strong> To enable the features of
              the service, including creating projects, endpoints, and tracking
              API usage.
            </li>
            <li>
              <strong>Analytics:</strong> To gather anonymous usage data, which
              helps improve the service.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            3. Data Retention
          </h2>
          <p className="mb-4">
            Email Address, Projects, and Endpoints are retained indefinitely by
            default. You can delete projects and endpoints at any time, and when
            deleted, all associated data will be removed. Logs are retained for
            7 days in Redis and then automatically deleted.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
          <p className="mb-4">
            We do not intentionally share your data with any third parties.
            However, usage behavior data is collected through Beam, an analytics
            service, which helps us understand how users interact with the
            platform.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">5. User Rights</h2>
          <p className="mb-4">
            You can manage your data as per the functionality provided by Clerk.
            For more details, please refer to{" "}
            <a href="https://clerk.com/legal/privacy" className="text-blue-500">
              Clerk’s Privacy Policy
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Security</h2>
          <p className="mb-4">
            We take reasonable steps to protect your personal data, including
            using Clerk for authentication and encryption. However, please note
            that we do not have additional specific security measures in place
            for sensitive data like email addresses and IP addresses. Your email
            is stored in a secure database (Neon), and your IP is stored
            temporarily in Redis.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            7. Your Data Protection Rights
          </h2>
          <p className="mb-4">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Request access to the personal data we store.</li>
            <li>Request correction of any inaccurate or incomplete data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Object to or restrict certain types of processing.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">8. Jurisdiction</h2>
          <p className="mb-4">
            We do not operate in any specific jurisdiction or actively seek to
            comply with any data protection laws such as GDPR or CCPA. However,
            we aim to comply with privacy best practices for all our users.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            9. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We reserve the right to update this Privacy Policy from time to
            time. Any changes will be posted on this page, and the effective
            date will be updated accordingly.
          </p>
        </div>
      </main>
      <Public_Footer />
    </div>
  );
}
