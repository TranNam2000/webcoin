'use client';

interface Wallet {
  name: string;
  symbol: string;
  balance: string;
  margin: string;
  volume: string;
  icon: string;
}

interface WalletListProps {
  wallets: Wallet[];
}

export default function WalletList({ wallets }: WalletListProps) {
  return (
    <div className="space-y-4">
      {wallets.map((wallet) => (
        <div
          key={wallet.symbol}
          className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between"
        >
          {/* Left Section with Wallet Info */}
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-2 rounded-lg shadow-md">
              <span>{wallet.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{wallet.name}</h3>
              <p className="text-sm text-gray-500">{wallet.symbol}</p>
            </div>
          </div>

          {/* Right Section with Balance and Margin/Volume */}
          <div className="text-right">
            <p className="font-medium text-gray-800">${wallet.balance}</p>
            <p className="text-sm text-gray-500">{wallet.margin} / {wallet.volume}</p>
          </div>

          {/* Action Button */}
          <button className="text-blue-500 hover:text-blue-600">
            <span className="text-xl">➔</span>
          </button>
        </div>
      ))}
    </div>
  );
} 