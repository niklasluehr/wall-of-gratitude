/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Wall of Gratitude",
  description: "Privacy policy for the Wall of Gratitude application",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700">
            This Privacy Policy explains how Wall of Gratitude ("we", "our", or
            "us") collects, uses, and protects your information when you use our
            application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Local Storage Data</h3>
              <p className="text-gray-700">
                We use your browser's local storage to save your gratitude
                entries. This data is stored only on your device and is not
                transmitted to our servers. You can clear this data at any time
                by clearing your browser's local storage.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Analytics Data</h3>
              <p className="text-gray-700">
                We use Vercel Analytics to collect anonymous usage data,
                including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                <li>Page views and navigation patterns</li>
                <li>Time spent on pages</li>
                <li>Device and browser information</li>
                <li>Geographic location (country/region level)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700">We use the collected information to:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
            <li>Provide and maintain the application</li>
            <li>Improve user experience</li>
            <li>Analyze usage patterns to enhance our service</li>
            <li>Store your gratitude entries locally on your device</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Data Storage and Security
          </h2>
          <p className="text-gray-700">
            Our application is hosted on Vercel, which implements
            industry-standard security measures. Your gratitude entries are
            stored locally on your device using browser local storage and are
            not transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
            <li>Access your locally stored data</li>
            <li>
              Delete your locally stored data by clearing your browser's local
              storage
            </li>
            <li>Opt out of analytics tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Changes to This Policy
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact
            us.
          </p>
        </section>
      </div>
    </div>
  );
}
