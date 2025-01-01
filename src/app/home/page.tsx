'use client'

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Payment from '../payment/page'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const data = {
    labels: ["12.21", "12.22", "12.23", "12.24", "12.25", "12.26", "12.27", "12.28", "12.29", "12.30"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 15, 30, 40, 25, 35, 50, 45, 20],
        backgroundColor: "#3b82f6",
        borderRadius: 10, // Add rounded corners to the bars

      },
      {
        label: "Dataset 2",
        data: [15, 10, 25, 20, 30, 40, 20, 45, 30, 15],
        backgroundColor: "#22c55e",
        borderRadius: 10, // Add rounded corners to the bars

      },
      {
        label: "Dataset 3",
        data: [20, 15, 10, 25, 35, 30, 40, 20, 35, 25],
        backgroundColor: "#ef4444",
        borderRadius: 10, // Add rounded corners to the bars

      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the legend (color labels)
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false, // Hide the x-axis grid lines
        },
      },
      y: {
        stacked: false,
        grid: {
          display: false, // Hide the y-axis grid lines
        },
        ticks: {
          display: false, // Hide the y-axis labels
        },
        borderColor: 'transparent', // Remove left border line
      },
    },
  };
  


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-lg p-4 flex justify-between items-center">
        <div className="text-blue-600 font-bold text-3xl">N</div>
        <div className="flex space-x-4">
          <a
            href="#"
            className={`px-3 py-2 rounded-md text-sm font-medium ${activeNav === 'Dashboard' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveNav('Dashboard')}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={`px-3 py-2 rounded-md text-sm font-medium ${activeNav === 'Payments' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveNav('Payments')}
          >
            Payments
          </a>
          <a
            href="#"
            className={`px-3 py-2 rounded-md text-sm font-medium ${activeNav === 'Wallets' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveNav('Wallets')}
          >
            Wallets
          </a>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-84 bg-white shadow-lg p-6 flex flex-col">

          {/* Balance Section */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">BALANCE</p>
            <p className="gray-500 font-semibold">$ 0.00</p>
            <p className="text-gray-500 text-sm mt-2">DAILY PROFIT</p>
            <p className="text-gray-500 font-semibold">$ 0</p>
          </div>

          {/* Quick Navigation */}
          <p className="font-semibold  text-gray-500  mb-5">Quick Navigation</p>
          <div className="grid grid-cols-3 gap-3">
            <button className="py-2 px-4 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 transition duration-200">
              Receive
            </button>
            <button className="py-2 px-4 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 transition duration-200">
              Send
            </button>
            <button className="py-2 px-4 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 transition duration-200">
              Swap
            </button>
            <button className="py-2 px-4 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 transition duration-200">
              Wallets
            </button>
            <button className="py-2 px-4 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 transition duration-200">
              Moves
            </button>
            <button className="py-2 px-4 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-300 transition duration-200">
              Club
            </button>
          </div>
          {/* Support */}
          <div className="mt-auto">
            <button className="w-full py-2 mt-4 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition duration-200">
              Support Center
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {activeNav === 'Dashboard' && (
            <>
              {/* Top Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Getting Started */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
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
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <h2 className="text-lg font-semibold">Limina Software</h2>
                  <p className="mt-2 text-sm">
                    Keep up the momentum — success is just around the corner!
                  </p>
                </div>
              </section>

              {/* Bottom Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Flow */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-gray-700">Account Flow</h3>
                  <p className="text-gray-500 mt-2">Movements</p>
                  <div className="w-full max-w-4xl mx-auto">
        <Bar options={options} data={data} />
      </div>
                </div>

                {/* Company Performance */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-gray-700">Company Performance</h3>
                  <p className="text-gray-500 mt-2">Daily Reporting Indicators</p>
                  <div className="w-full max-w-4xl mx-auto">
                <Bar options={options} data={data} />
                </div>
                </div>
                
              </section>
              <section >
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                  <h2 className="text-lg font-semibold text-blue-600">Limina Live Trades
                  </h2>
                  <p className="text-gray-500 mt-2">Profitable transactions                  </p>
                </div>
              </section>
            </>
          )}
          {activeNav === 'Payments' && (
         
            <div>
<Payment />
            </div>
          )}
          {activeNav === 'Wallets' && (
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-blue-600">Wallets</h2>
              <p className="text-gray-500 mt-2">Manage your wallets here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 