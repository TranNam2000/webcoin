import { useState } from 'react';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvestmentModal = ({ isOpen, onClose }: InvestmentModalProps) => {
  const [amount, setAmount] = useState('100');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [loading, setLoading] = useState(false);

  const packages = [
    'Spark',
    'Blaze',
    'Radiance',
    'Glow',
    'Luminous',
    'Brilliance'
  ];

  const handleAgree = async () => {
    try {
      if (!selectedPackage) {
        alert('Please select an investment package');
        return;
      }

      setLoading(true);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'tungnguyentrung77@gmail.com',
          amount,
          selectedPackage,
          type: 'investment'
        })
      });

      const result = await response.json();
      handleAgreeAdmin();

      if (result.success) {
        alert('Investment successful! Check your email for confirmation.');
        setAmount('');
        setSelectedPackage('');
        onClose();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your investment');
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeAdmin = async () => {
    try {
      const adminEmailResponse = await fetch('/api/send-admin-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'tungnguyentrung77@gmail.com',
          amount,
          selectedPackage,
          network: '',
          type: 'investment',
          message: `A new investment has been made: ${amount} in package ${selectedPackage}.`
        })
      });

      const adminResult = await adminEmailResponse.json();

      if (!adminResult.success) {
        throw new Error(adminResult.error || 'Failed to send admin notification');
      }

      console.log('Admin notified successfully.');

    } catch (error) {
      console.error('Error notifying admin:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={onClose} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white text-xl ml-4">Investment Package</h2>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-white block mb-2">Address</label>
            <input 
              type="text" 
              value="0x3feb2e9B0da1A3F7DDdCc5E2a46FD299C67939ef"
              readOnly
              className="w-full bg-[#2a2a2a] text-white p-2 rounded"
            />
          </div>

          <div>
            <label className="text-white block mb-2">Amount</label>
            <div className="relative">
              <input 
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white p-2 rounded"
              />
              <span className="absolute right-3 top-2 text-white">USD</span>
            </div>
          </div>

          <div>
            <label className="text-white block mb-2">Investment packages</label>
            <div className="relative">
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full bg-[#2a2a2a] text-orange-500 p-2 rounded appearance-none"
              >
                <option value="">Select Investment Packages</option>
                {packages.map((pkg) => (
                  <option key={pkg} value={pkg}>{pkg}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            onClick={handleAgree}
            disabled={loading}
            className="w-full bg-teal-500 text-white py-3 rounded mt-6 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Agree'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;
