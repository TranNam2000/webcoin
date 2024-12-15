'use client'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="text-blue-600 font-bold text-3xl">N</div>
        </div>

        {/* Balance Section */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">BALANCE</p>
          <p className="text-lg font-semibold">$ 0.00</p>
          <p className="text-gray-500 text-sm mt-2">DAILY PROFIT</p>
          <p className="text-lg font-semibold">$ 0</p>
        </div>

        {/* Quick Navigation */}
        <p className="font-semibold mb-4">Quick Navigation</p>
        <div className="grid grid-cols-3 gap-2">
          <button className="py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            Receive
          </button>
          <button className="py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            Send
          </button>
          <button className="py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            Swap
          </button>
          <button className="py-2 bg-gray-200 rounded">Wallets</button>
          <button className="py-2 bg-gray-200 rounded">Moves</button>
          <button className="py-2 bg-gray-200 rounded">Club</button>
        </div>
        {/* Support */}
        <div className="mt-auto">
          <button className="w-full py-2 mt-4 bg-blue-50 text-blue-500 rounded">
            Support Center
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Getting Started */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-blue-600">
              Getting Started
            </h2>
            <p className="text-gray-500 mt-2">
              Just a couple more steps to unlock all the features and maximize
              your daily earnings.
            </p>
            <div className="mt-4 text-sm text-gray-600">
              <ul className="list-disc list-inside space-y-1">
                <li>Personal Information</li>
                <li>Security PIN</li>
                <li>Security 2FA</li>
              </ul>
            </div>
          </div>

          {/* Limina Software Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Limina Software</h2>
            <p className="mt-2 text-sm">
              Keep up the momentum — success is just around the corner!
            </p>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Flow */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Account Flow</h3>
            <p className="text-gray-500 mt-2">Movements</p>
            {/* Placeholder Chart */}
            <div className="h-24 bg-gray-100 mt-4 rounded"></div>
          </div>

          {/* Company Performance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Company Performance</h3>
            <p className="text-gray-500 mt-2">Daily Reporting Indicators</p>
            <div className="h-24 bg-gray-100 mt-4 rounded"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
