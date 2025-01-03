
function Payments() {
  return (
    <div>
         <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-blue-600">Payments</h2>
              <p className="text-gray-500 mt-2">Manage your payments here.</p>
             
            </div>
      <div className="flex flex-col lg:flex-row  lg:space-y-10 lg:space-x-8">
        {/* Wallets Section */}
        <div className="flex-1  p-6">
          <div className="divide-y divide-gray-200">
          {wallets.map((wallet) => (
  <div
    key={wallet.symbol}
    className="bg-white p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between"
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
    <button className="text-blue-500 hover:underline">➔</button>
  </div>
))}

          </div>
        </div>

        {/* Sidebar Section */} 
        <div className="flex flex-col space-y-8">
          {/* Account Flow */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-bold pb-4">Account Flow</h2>
            <div className="h-32 bg-gray-100 rounded-lg"></div>
          </div>

          {/* Latest Movements */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-xl font-bold pb-4">Latest Movements</h2>
            <div className="h-32 bg-gray-100 rounded-lg"></div>
          </div>
        </div>
      </div>
      </div>

  );
}

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
  // Add more wallets as needed
];

export default Payments;
