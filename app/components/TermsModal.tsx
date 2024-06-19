import React from 'react';

type TermsModalProps = {
  onClose: () => void;
  businessName: string;
};

const TermsModal: React.FC<TermsModalProps> = ({ onClose, businessName }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p>
          1. Introduction
          {businessName} ("we", "our", "us") is committed to protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our locksmith services and website.
        </p>
        <p>
          2. Data Collection
          2.1 Personal Data Collected
          We may collect and process the following personal data about you:
          Name
          Address
          Email address
          Phone number
          Service details
          Payment information
          Any other information you provide while using our services
        </p>
        <p>
          2.2 Data Collection Methods
          We collect personal data directly from you through:
          Our online forms when you request a quote or book a service
          Phone calls or emails when you contact us for services or support
          In-person interactions during the provision of services
        </p>
        <p>
          3. Use of Personal Data
          3.1 Purpose of Data Collection
          We use your personal data to:
          Provide and manage our locksmith services
          Process your requests and transactions
          Communicate with you about your service requests and any updates
          Improve our services and customer experience
          Comply with legal obligations
        </p>
        <p>
          3.2 Lead Generation and Booking Services
          We use the Workiz platform to manage leads and booking services. Your data will be stored and processed in Workiz to:
          Schedule and manage service appointments
          Generate and manage leads for future services
          Send you reminders and updates regarding your appointments
        </p>
        <p>
          4. Data Sharing
          We do not sell, trade, or otherwise transfer your personal data to outside parties, except as required by law or as necessary to provide our services (e.g., sharing your data with Workiz for scheduling and management purposes).
        </p>
        <p>
          5. Data Protection
          We implement appropriate technical and organizational measures to ensure the security of your personal data, including encryption, access controls, and secure storage.
        </p>
        <p>
          6. Your Rights
          You have the right to:
          Access your personal data
          Rectify any inaccuracies in your personal data
          Request the deletion of your personal data
          Object to or restrict the processing of your personal data
          Withdraw your consent at any time
          To exercise these rights, please contact us at [Contact Information].
        </p>
        <p>
          7. Changes to This Privacy Policy
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.
        </p>
        <p>
          8. Contact Us
          If you have any questions about this Privacy Policy or our data practices, please contact us at: {businessName}.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
