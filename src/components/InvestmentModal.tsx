'use client';

import { useState } from 'react';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvestmentModal = ({ isOpen, onClose }: InvestmentModalProps) => {
  const [amount, setAmount] = useState('100');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('USDT');
  const [loading, setLoading] = useState(false);

  const networks = [
    { symbol: 'BTC', icon: '₿', color: 'text-orange-500' },
    { symbol: 'ETH', icon: 'Ξ', color: 'text-blue-400' },
    { symbol: 'USDT', icon: '₮', color: 'text-green-500' },
    { symbol: 'BNB', icon: 'BNB', color: 'text-yellow-500' },
    { symbol: 'USDC', icon: 'USDC', color: 'text-blue-500' },
    { symbol: 'LTC', icon: 'Ł', color: 'text-gray-400' },
    { symbol: 'SOL', icon: 'SOL', color: 'text-purple-500' },
    { symbol: 'DAI', icon: 'DAI', color: 'text-yellow-400' },
  ];

  const getPackagesForNetwork = (network: string) => {
    switch (network) {
      case 'USDT':
        return [
          { name: 'Spark', range: '10 - 200,000 USDT', rate: '0.65%' },
          { name: 'Blaze', range: '10 - 200,000 USDT', rate: '0.91%' },
          { name: 'Radiance', range: '10 - 200,000 USDT', rate: '1.10%' },
          { name: 'Glow', range: '10 - 200,000 USDT', rate: '1.45%' },
          { name: 'Luminous', range: '10 - 200,000 USDT', rate: '1.73%' },
          { name: 'Brilliance', range: '10 - 200,000 USDT', rate: '2.46%' }
        ];
      case 'BTC':
        return [
          { name: 'BTC Starter', range: '0.001 - 5 BTC', rate: '0.65%' },
          { name: 'BTC Pro', range: '0.001 - 5 BTC', rate: '1.45%' },
          { name: 'BTC Elite', range: '0.001 - 5 BTC', rate: '2.10%' }
        ];
      case 'ETH':
        return [
          { name: 'ETH Starter', range: '0.01 - 50 ETH', rate: '0.91%' },
          { name: 'ETH Pro', range: '0.01 - 50 ETH', rate: '1.73%' },
          { name: 'ETH Elite', range: '0.01 - 50 ETH', rate: '2.46%' }
        ];
      case 'BNB':
        return [
          { name: 'BNB Starter', range: '0.1 - 100 BNB', rate: '0.85%' },
          { name: 'BNB Growth', range: '0.1 - 100 BNB', rate: '1.55%' },
          { name: 'BNB Premium', range: '0.1 - 100 BNB', rate: '2.25%' }
        ];
      case 'USDC':
        return [
          { name: 'USDC Basic', range: '100 - 100,000 USDC', rate: '0.65%' },
          { name: 'USDC Plus', range: '100 - 100,000 USDC', rate: '1.45%' },
          { name: 'USDC Elite', range: '100 - 100,000 USDC', rate: '2.10%' }
        ];
      case 'LTC':
        return [
          { name: 'LTC Basic', range: '0.1 - 100 LTC', rate: '0.75%' },
          { name: 'LTC Plus', range: '0.1 - 100 LTC', rate: '1.55%' },
          { name: 'LTC Premium', range: '0.1 - 100 LTC', rate: '2.15%' }
        ];
      case 'SOL':
        return [
          { name: 'SOL Basic', range: '1 - 1,000 SOL', rate: '0.85%' },
          { name: 'SOL Growth', range: '1 - 1,000 SOL', rate: '1.65%' },
          { name: 'SOL Premium', range: '1 - 1,000 SOL', rate: '2.35%' }
        ];
      case 'DAI':
        return [
          { name: 'DAI Basic', range: '10 - 100,000 DAI', rate: '0.65%' },
          { name: 'DAI Plus', range: '10 - 100,000 DAI', rate: '1.45%' },
          { name: 'DAI Premium', range: '10 - 100,000 DAI', rate: '2.10%' }
        ];
      default:
        return [];
    }
  };

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
          email: 'tungnguyentrung11@gmail.com',
          amount: `${amount} ${selectedNetwork}`,
          selectedPackage,
          network: selectedNetwork,
          type: 'investment'
        })
      });

      const result = await response.json();
      await handleAgreeAdmin();

      if (result.success) {
        alert(`Investment successful! Check your email for confirmation. Amount: ${amount} ${selectedNetwork}`);
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
          email: 'tungnguyentrung11@gmail.com',
          amount: `${amount} ${selectedNetwork}`,
          selectedPackage,
          network: selectedNetwork,
          type: 'investment',
          message: `A new investment has been made: ${amount} ${selectedNetwork} in package ${selectedPackage}.`
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

          {/* Network Selection */}
          <div>
            <label className="text-white block mb-2">Network</label>
            <div className="grid grid-cols-4 gap-2">
              {networks.map((network) => (
                <button
                  key={network.symbol}
                  onClick={() => {
                    setSelectedNetwork(network.symbol);
                    setSelectedPackage('');
                  }}
                  className={`p-2 rounded flex flex-col items-center justify-center ${
                    selectedNetwork === network.symbol 
                      ? 'bg-gray-700 border border-gray-600' 
                      : 'bg-[#2a2a2a]'
                  }`}
                >
                  <span className={`text-xl ${network.color}`}>{network.icon}</span>
                  <span className="text-white text-sm mt-1">{network.symbol}</span>
                </button>
              ))}
            </div>
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
              <span className="absolute right-3 top-2 text-white">{selectedNetwork}</span>
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
                <option value="">Select Investment Package</option>
                {getPackagesForNetwork(selectedNetwork).map((pkg) => (
                  <option key={pkg.name} value={pkg.name}>
                    {pkg.name} ({pkg.range}) - {pkg.rate}
                  </option>
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
