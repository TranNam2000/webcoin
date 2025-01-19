'use client';
import { useState, useEffect } from 'react';
import InvestmentModal from '@/components/InvestmentModal';
import WithdrawalModal from '@/components/WithdrawalModal';
import WalletList from '@/components/WalletList';

const wallets = [
  {
    name: "Binance",
    symbol: "BNB",
    balance: "707.759",
    margin: "0.006%",
    volume: "$2.1M",
    icon: "🔶",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: "93,997.3",
    margin: "0.0191%",
    volume: "$209.7M",
    icon: "🟠",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: "3,354.55",
    margin: "0.006%",
    volume: "$131.6M",
    icon: "⚪",
  },
];

interface InvestmentPackage {
  name: string;
  percentage: string;
  minAmount: number;
  maxAmount: number;
  icon: string;
  rate: number;
  description: string;
  unit: string;
}

const investmentPackages: InvestmentPackage[] = [
  { 
    name: "Spark", 
    percentage: "0.65%", 
    minAmount: 10, 
    maxAmount: 1000,
    icon: "$",
    rate: 0.65,
    description: "Entry level investment package",
    unit: "USD"
  },
  { 
    name: "Blaze", 
    percentage: "0.91%", 
    minAmount: 1000, 
    maxAmount: 5000,
    icon: "$",
    rate: 0.91,
    description: "Advanced investment package",
    unit: "USD"
  },
  { 
    name: "Radiance", 
    percentage: "1.10%", 
    minAmount: 5000, 
    maxAmount: 10000,
    icon: "$",
    rate: 1.10,
    description: "Premium investment package",
    unit: "USD"
  },
  { 
    name: "Glow", 
    percentage: "1.45%", 
    minAmount: 10000, 
    maxAmount: 50000,
    icon: "$",
    rate: 1.45,
    description: "Premium investment package",
    unit: "USD"
  },
  { 
    name: "Luminous", 
    percentage: "1.73%", 
    minAmount: 50000, 
    maxAmount: 100000,
    icon: "$",
    rate: 1.73,
    description: "Premium investment package",
    unit: "USD"
  },
  { 
    name: "Brilliance", 
    percentage: "2.46%", 
    minAmount: 100000, 
    maxAmount: 200000,
    icon: "$",
    rate: 2.46,
    description: "Premium investment package",
    unit: "USD"
  },
];

interface CryptoBalance {
  symbol: string;
  icon: string | React.ReactNode;
  amount: string;
  color: string;
}

interface CryptoPackage {
  name: string;
  icon: string;
  percentage: string;
  minAmount: number;
  maxAmount: number;
  rate: number;
  description: string;
  unit: string;
}

const cryptoBalances: CryptoBalance[] = [
  { 
    symbol: 'BTC', 
    icon: '₿', 
    amount: '0.000000',
    color: 'text-orange-500'
  },
  { 
    symbol: 'ETH', 
    icon: 'Ξ', 
    amount: '0.000000',
    color: 'text-blue-400'
  },
  { 
    symbol: 'USDT', 
    icon: '₮', 
    amount: '0.00',
    color: 'text-green-500'
  },
  { 
    symbol: 'BNB', 
    icon: 'BNB', 
    amount: '0.00000',
    color: 'text-yellow-500'
  },
  { 
    symbol: 'USDC', 
    icon: 'USDC', 
    amount: '0.00',
    color: 'text-blue-500'
  },
  { 
    symbol: 'LTC', 
    icon: 'Ł', 
    amount: '0.0000',
    color: 'text-gray-400'
  },
  { 
    symbol: 'SOL', 
    icon: 'SOL', 
    amount: '0.00000',
    color: 'text-purple-500'
  },
  { 
    symbol: 'DAI', 
    icon: 'DAI', 
    amount: '0.00',
    color: 'text-yellow-400'
  },
];

const getCryptoPackages = (symbol: string): CryptoPackage[] => {
  switch (symbol) {
    case 'BTC':
      return [
        {
          name: "BTC Starter",
          icon: "₿",
          percentage: "0.65%",
          minAmount: 0.001,
          maxAmount: 5,
          rate: 0.65,
          description: "Entry level Bitcoin investment package",
          unit: "BTC"
        },
        {
          name: "BTC Pro",
          icon: "₿",
          percentage: "1.45%",
          minAmount: 0.001,
          maxAmount: 5,
          rate: 1.45,
          description: "Professional Bitcoin investment package",
          unit: "BTC"
        },
        {
          name: "BTC Elite",
          icon: "₿",
          percentage: "2.46%",
          minAmount: 0.001,
          maxAmount: 5,
          rate: 2.46,
          description: "Elite Bitcoin investment package",
          unit: "BTC"
        }
      ];

    case 'ETH':
      return [
        {
          name: "ETH Starter",
          icon: "Ξ",
          percentage: "0.91%",
          minAmount: 0.01,
          maxAmount: 50,
          rate: 0.91,
          description: "Entry level Ethereum investment package",
          unit: "ETH"
        },
        {
          name: "ETH Pro",
          icon: "Ξ",
          percentage: "1.73%",
          minAmount: 0.01,
          maxAmount: 50,
          rate: 1.73,
          description: "Professional Ethereum investment package",
          unit: "ETH"
        },
        {
          name: "ETH Elite",
          icon: "Ξ",
          percentage: "2.46%",
          minAmount: 0.01,
          maxAmount: 50,
          rate: 2.46,
          description: "Elite Ethereum investment package",
          unit: "ETH"
        }
      ];

    case 'USDT':
      return [
        {
          name: "Spark",
          icon: "₮",
          percentage: "0.65%",
          minAmount: 10,
          maxAmount: 200000,
          rate: 0.65,
          description: "Basic USDT investment package",
          unit: "USDT"
        },
        {
          name: "Blaze",
          icon: "₮",
          percentage: "0.91%",
          minAmount: 10,
          maxAmount: 200000,
          rate: 0.91,
          description: "Advanced USDT investment package",
          unit: "USDT"
        },
        {
          name: "Radiance",
          icon: "₮",
          percentage: "1.10%",
          minAmount: 10,
          maxAmount: 200000,
          rate: 1.10,
          description: "Premium USDT investment package",
          unit: "USDT"
        },
        {
          name: "Glow",
          icon: "₮",
          percentage: "1.45%",
          minAmount: 10,
          maxAmount: 200000,
          rate: 1.45,
          description: "Premium USDT investment package",
          unit: "USDT"
        },
        {
          name: "Luminous",
          icon: "₮",
          percentage: "1.73%",
          minAmount: 10,
          maxAmount: 200000,
          rate: 1.73,
          description: "Premium USDT investment package",
          unit: "USDT"
        },
        {
          name: "Brilliance",
          icon: "₮",
          percentage: "2.46%",
          minAmount: 10,
          maxAmount: 200000,
          rate: 2.46,
          description: "Premium USDT investment package",
          unit: "USDT"
        }
      ];

    case 'BNB':
      return [
        {
          name: "BNB Starter",
          icon: "BNB",
          percentage: "0.85%",
          minAmount: 0.1,
          maxAmount: 100,
          rate: 0.85,
          description: "Entry level BNB investment package",
          unit: "BNB"
        },
        {
          name: "BNB Growth",
          icon: "BNB",
          percentage: "1.55%",
          minAmount: 0.1,
          maxAmount: 100,
          rate: 1.55,
          description: "Growth BNB investment package",
          unit: "BNB"
        },
        {
          name: "BNB Premium",
          icon: "BNB",
          percentage: "2.25%",
          minAmount: 0.1,
          maxAmount: 100,
          rate: 2.25,
          description: "Premium BNB investment package",
          unit: "BNB"
        }
      ];

    case 'USDC':
      return [
        {
          name: "USDC Basic",
          icon: "USDC",
          percentage: "0.65%",
          minAmount: 100,
          maxAmount: 100000,
          rate: 0.65,
          description: "Basic USDC investment package",
          unit: "USDC"
        },
        {
          name: "USDC Plus",
          icon: "USDC",
          percentage: "1.45%",
          minAmount: 100,
          maxAmount: 100000,
          rate: 1.45,
          description: "Plus USDC investment package",
          unit: "USDC"
        },
        {
          name: "USDC Elite",
          icon: "USDC",
          percentage: "2.10%",
          minAmount: 100,
          maxAmount: 100000,
          rate: 2.10,
          description: "Elite USDC investment package",
          unit: "USDC"
        }
      ];

    case 'LTC':
      return [
        {
          name: "LTC Basic",
          icon: "Ł",
          percentage: "0.75%",
          minAmount: 0.1,
          maxAmount: 100,
          rate: 0.75,
          description: "Basic Litecoin investment package",
          unit: "LTC"
        },
        {
          name: "LTC Pro",
          icon: "Ł",
          percentage: "1.55%",
          minAmount: 0.1,
          maxAmount: 100,
          rate: 1.55,
          description: "Professional Litecoin investment package",
          unit: "LTC"
        },
        {
          name: "LTC Premium",
          icon: "Ł",
          percentage: "2.15%",
          minAmount: 0.1,
          maxAmount: 100,
          rate: 2.15,
          description: "Premium Litecoin investment package",
          unit: "LTC"
        }
      ];

    case 'SOL':
      return [
        {
          name: "SOL Starter",
          icon: "SOL",
          percentage: "0.85%",
          minAmount: 1,
          maxAmount: 1000,
          rate: 0.85,
          description: "Entry level Solana investment package",
          unit: "SOL"
        },
        {
          name: "SOL Growth",
          icon: "SOL",
          percentage: "1.65%",
          minAmount: 1,
          maxAmount: 1000,
          rate: 1.65,
          description: "Growth Solana investment package",
          unit: "SOL"
        },
        {
          name: "SOL Elite",
          icon: "SOL",
          percentage: "2.35%",
          minAmount: 1,
          maxAmount: 1000,
          rate: 2.35,
          description: "Elite Solana investment package",
          unit: "SOL"
        }
      ];

    case 'DAI':
      return [
        {
          name: "DAI Basic",
          icon: "DAI",
          percentage: "0.65%",
          minAmount: 10,
          maxAmount: 100000,
          rate: 0.65,
          description: "Basic DAI investment package",
          unit: "DAI"
        },
        {
          name: "DAI Plus",
          icon: "DAI",
          percentage: "1.45%",
          minAmount: 10,
          maxAmount: 100000,
          rate: 1.45,
          description: "Plus DAI investment package",
          unit: "DAI"
        },
        {
          name: "DAI Premium",
          icon: "DAI",
          percentage: "2.10%",
          minAmount: 10,
          maxAmount: 100000,
          rate: 2.10,
          description: "Premium DAI investment package",
          unit: "DAI"
        }
      ];

    default:
      return [];
  }
};

export default function Payment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<'wallets' | 'investment'>('wallets');
  const [selectedPackage, setSelectedPackage] = useState<CryptoPackage | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [assetType, setAssetType] = useState<'crypto' | 'usd'>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('USDT');
  const [cryptoAmount, setCryptoAmount] = useState<string>('');

  useEffect(() => {
    if (activeView === 'investment') {
      setAssetType('crypto');
      setSelectedCrypto('USDT');
      const packages = getCryptoPackages('USDT');
      setSelectedPackage(packages[0]);
      setCryptoAmount('');
    }
  }, [activeView]);

  const calculateMonthlyProfit = (amount: number, percentage: string) => {
    const rate = parseFloat(percentage.replace('%', '')) / 100;
    return (amount * rate).toFixed(2);
  };

  const calculateCryptoProfit = (amount: number, rate: number) => {
    const monthlyProfit = amount * (rate / 100);
    const annualProfit = monthlyProfit * 12;
    return {
      monthly: monthlyProfit.toFixed(8),
      annual: annualProfit.toFixed(8)
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 mb-6">
        <h2 className="text-lg font-semibold text-blue-600">Payments</h2>
        <p className="text-gray-500 mt-2">Manage your payments here.</p>
        
        {/* View Toggle Buttons */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setActiveView('wallets')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'wallets'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Deposit History
          </button>
          <button
            onClick={() => setActiveView('investment')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'investment'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {activeView === 'wallets' ? (
            <WalletList wallets={wallets} />
          ) : (
            <div className="bg-black p-6 rounded-lg">
              <div className="space-y-6">
                {/* Choose Asset Type */}
                <div className="space-y-2">
                  <h3 className="text-white">Choose offer</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setAssetType('crypto')}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        assetType === 'crypto'
                          ? 'bg-green-500 text-white'
                          : 'bg-black text-gray-400 border border-gray-600'
                      }`}
                    >
                      Crypto Assets
                    </button>
                  </div>
                </div>

                {/* Investment Packages Grid */}
                {assetType === 'usd' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {investmentPackages.map((pkg) => (
                      <button
                        key={pkg.name}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-4 rounded-lg transition-all ${
                          selectedPackage?.name === pkg.name
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300'
                        }`}
                      >
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        <p className="text-2xl font-bold mt-2">{pkg.percentage}</p>
                        <p className="text-sm mt-2">
                          ${pkg.minAmount.toLocaleString()} - ${pkg.maxAmount.toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {assetType === 'crypto' && (
                  <div className="space-y-6">
                    {/* Crypto Selection Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {cryptoBalances.map((crypto) => (
                        <button
                          key={crypto.symbol}
                          onClick={() => setSelectedCrypto(crypto.symbol)}
                          className={`p-4 rounded-lg transition-all flex items-center justify-between ${
                            selectedCrypto === crypto.symbol
                              ? 'bg-gray-800 border border-gray-600'
                              : 'bg-black border border-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className={`text-xl ${crypto.color}`}>{crypto.icon}</span>
                            <span className="text-white">{crypto.symbol}</span>
                          </div>
                          <span className="text-gray-400">{crypto.amount}</span>
                        </button>
                      ))}
                    </div>

                    {/* Investment Packages for Selected Crypto */}
                    {selectedPackage && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getCryptoPackages(selectedCrypto).map((pkg) => (
                            <button
                              key={pkg.name}
                              onClick={() => setSelectedPackage(pkg)}
                              className={`p-6 rounded-lg transition-all ${
                                selectedPackage.name === pkg.name
                                  ? 'bg-blue-600'
                                  : 'bg-gray-800'
                              }`}
                            >
                              <div className="text-center">
                                <h3 className="text-xl text-white font-semibold">{pkg.name}</h3>
                                <p className="text-3xl font-bold text-white mt-2">{pkg.percentage}</p>
                                <p className="text-gray-300 mt-2">
                                  {pkg.minAmount} - {pkg.maxAmount} {pkg.unit}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Calculator Section */}
                        <div className="space-y-4 mt-6 p-6 bg-gray-800 rounded-lg">
                          <h3 className="text-xl text-white font-semibold">
                            {selectedCrypto} Investment Calculator - {selectedPackage.name}
                          </h3>

                          <div className="space-y-2">
                            <label className="text-gray-300">Investment Amount</label>
                            <div className="p-3 bg-black border border-gray-600 rounded flex items-center">
                              <input
                                type="number"
                                value={cryptoAmount}
                                onChange={(e) => setCryptoAmount(e.target.value)}
                                className="bg-transparent text-white outline-none flex-1"
                                placeholder={`Min ${selectedPackage.minAmount}`}
                                min={selectedPackage.minAmount}
                                max={selectedPackage.maxAmount}
                                step="0.000001"
                              />
                              <span className="text-gray-400 ml-2">{selectedCrypto}</span>
                            </div>
                            <p className="text-sm text-gray-400">
                              Min: {selectedPackage.minAmount} - Max: {selectedPackage.maxAmount} {selectedCrypto}
                            </p>
                          </div>

                          {cryptoAmount && Number(cryptoAmount) >= selectedPackage.minAmount && (
                            <div className="space-y-4 mt-4">
                              <div className="flex justify-between text-gray-300">
                                <span>Monthly Profit</span>
                                <span className="text-green-500">
                                  {(Number(cryptoAmount) * selectedPackage.rate / 100).toFixed(8)} {selectedCrypto}
                                </span>
                              </div>
                              <div className="flex justify-between text-gray-300">
                                <span>Annual Profit</span>
                                <span className="text-green-500">
                                  {(Number(cryptoAmount) * selectedPackage.rate / 100 * 12).toFixed(8)} {selectedCrypto}
                                </span>
                              </div>
                              <div className="flex justify-between text-gray-300">
                                <span>Rate</span>
                                <span className="text-yellow-500">{selectedPackage.percentage} Monthly</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-green-500">BUY</span>
              <span>Buy</span>
            </button>
            
            <button 
              onClick={() => setIsWithdrawModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <span className="text-green-500">$</span>
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      <InvestmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
      />
    </div>
  );
}