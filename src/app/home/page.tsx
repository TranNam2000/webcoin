'use client'

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Payment from '../payment/page';
import ProfileDetails from './ProfileDetails';

// Dynamic imports
const Line = dynamic(
  () => import('react-chartjs-2').then((mod) => mod.Line),
  { ssr: false }
);

const Chart = dynamic(() => import('@/components/Chart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>
});

interface ZoomState {
    x: number;
    y: number;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

interface Trade {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
}

export default function Home() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [timeframe, setTimeframe] = useState('15m');
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [isInitialPeriod, setIsInitialPeriod] = useState(true);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [zoomState, setZoomState] = useState<ZoomState | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [user, setUser] = useState<{ name: string; uid: string; email: string } | null>(null);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const initialData = {
    labels: Array(100).fill('').map((_, i) => ''),
    datasets: [{
      label: "BTC/USDT",
      data: Array(100).fill(null),
      borderColor: '#3b82f6',
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
      tension: 0,
      borderWidth: 8,
      pointRadius: 0,
      segment: {
        borderColor: (ctx: any) => {
          if (ctx.p0.parsed.y > ctx.p1.parsed.y) {
            return '#ef4444';
          }
          return '#22c55e';
        },
        backgroundColor: (ctx: any) => {
          if (ctx.p0.parsed.y > ctx.p1.parsed.y) {
            return 'rgba(239, 68, 68, 0.2)';
          }
          return 'rgba(34, 197, 94, 0.2)';
        }
      }
    }],
  };

  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialPeriod(false);
    }, 120000);

    return () => clearTimeout(timer);
  }, []);

  const getUpdateInterval = (tf: string) => {
    if (isInitialPeriod) return 1000;

    return 15000;
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch('https://www.okx.com/api/v5/market/candles?instId=BTC-USDT&bar=1m&limit=100');
      const data = await response.json();
      
      if (data.data) {
        const historicalPrices = data.data.reverse().map((candle: string[]) => ({
          time: new Date(parseInt(candle[0])).toLocaleTimeString(),
          price: parseFloat(candle[4])
        }));

        setChartData(prevData => ({
          labels: historicalPrices.map((item: { time: string }) => item.time),
          datasets: [{
            ...prevData.datasets[0],
            data: historicalPrices.map((item: { price: number }) => item.price),
          }]
        }));
        setIsHistoryLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    if (!isHistoryLoaded) {
      fetchHistoricalData();
      return;
    }

    const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
    const updateInterval = getUpdateInterval(timeframe);

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({
        op: 'subscribe',
        args: [{
          channel: "tickers",
          instId: "BTC-USDT"
        }]
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.data && message.data[0]) {
        const currentTime = Date.now();
        if (currentTime - lastUpdateTime >= updateInterval) {
          const newPrice = parseFloat(message.data[0].last);
          const now = new Date();
          const timeStr = now.toLocaleTimeString();

          setChartData(prevData => {
            const lastPrice = prevData.datasets[0].data[prevData.datasets[0].data.length - 1];
            
            return {
              labels: [...prevData.labels.slice(1), timeStr],
              datasets: [{
                ...prevData.datasets[0],
                data: [...prevData.datasets[0].data.slice(1), newPrice],
                segment: {
                  borderColor: (ctx: any) => {
                    if (ctx.p0.parsed.y > ctx.p1.parsed.y) {
                      return '#ef4444';
                    }
                    return '#22c55e';
                  },
                  backgroundColor: (ctx: any) => {
                    if (ctx.p0.parsed.y > ctx.p1.parsed.y) {
                      return 'rgba(239, 68, 68, 0.2)';
                    }
                    return 'rgba(34, 197, 94, 0.2)';
                  }
                }
              }],
            };
          });

          setPreviousPrice(newPrice);
          setLastUpdateTime(currentTime);
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [timeframe, lastUpdateTime, isInitialPeriod, isHistoryLoaded]);

  useEffect(() => {
    const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        op: 'subscribe',
        args: [
          { channel: "tickers", instId: "BTC-USDT" },
          { channel: "tickers", instId: "ETH-USDT" },
          { channel: "tickers", instId: "XRP-USDT" },
          { channel: "tickers", instId: "USDT-USDT" },
          { channel: "tickers", instId: "BNB-USDT" },
          { channel: "tickers", instId: "SOL-USDT" },
          { channel: "tickers", instId: "DOGE-USDT" },
          { channel: "tickers", instId: "USDC-USDT" },
          { channel: "tickers", instId: "ADA-USDT" },
        ]
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.data && message.data[0]) {
        const ticker = message.data[0];
        updateTrades(ticker);
      }
    };

    return () => ws.close();
  }, []);

  const updateTrades = (ticker: any) => {
    const symbolMap: { [key: string]: string } = {
      'BTC-USDT': 'Bitcoin',
      'ETH-USDT': 'Ethereum',
      'XRP-USDT': 'Ripple',
      'USDT-USDT': 'Tether',
      'BNB-USDT': 'BNB',
      'SOL-USDT': 'Solana',
      'DOGE-USDT': 'Dogecoin',
      'USDC-USDT': 'USD Coin',
      'ADA-USDT': 'Cardano'
    };

    const trade: Trade = {
      symbol: ticker.instId.split('-')[0],
      name: symbolMap[ticker.instId] || ticker.instId,
      price: parseFloat(ticker.last),
      change24h: ((parseFloat(ticker.last) - parseFloat(ticker.open24h)) / parseFloat(ticker.open24h)) * 100,
      volume24h: `$${(parseFloat(ticker.volCcy24h)/1000000).toFixed(2)}T`
    };

    setTrades(prev => {
      const existing = prev.find(t => t.symbol === trade.symbol);
      if (!existing) {
        return [...prev, trade];
      }
      return prev.map(t => t.symbol === trade.symbol ? trade : t);
    });
  };

  const options = {
    responsive: true,
    animation: {
      duration: 0
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: 'BTC/USDT Real-time Chart',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy' as const,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy' as const,
        },
        limits: {
          x: {minRange: 1000},
          y: {minRange: 100}
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
          autoSkip: true,
        },
        min: zoomState?.xMin,
        max: zoomState?.xMax,
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          precision: 1,
        },
        min: zoomState?.yMin,
        max: zoomState?.yMax,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      line: {
        capBezierPoints: true
      }
    }
  } as const;

  const userDetails = {
    rank: "Preparatory Representative",
    secondaryVolume: "0.00",
    totalVolume: "50,000.00",
    totalRevenue: "0.00",
    secondaryToday: "0.00",
    revenueToday: "0.00",
    referralCode: "WMVWIF",
    referralLink: "https://localhost:3000",
  };

  if (!mounted) {
    return null;
  }

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

          {/* User Info Section */}
          {user && (
            <div className="bg-blue-500 text-white p-4 rounded-lg mb-6 flex items-center cursor-pointer" onClick={() => setShowProfileDetails(true)}>
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm">{user.email}</p>
                <div className="bg-white text-black font-bold p-2 rounded mt-2">
                  Preparatory Representative
                </div>
              </div>
            </div>
          )}

          {/* Hiển thị ProfileDetails nếu showProfileDetails là true */}
          {showProfileDetails && (
            <ProfileDetails user={userDetails} onClose={() => setShowProfileDetails(false)} />
          )}

          {/* Balance Section */}
          <div className="mb-6">
            <p className="text-black text-sm font-bold">BALANCE</p>
            <p className="text-black font-semibold text-lg">$ 0.00</p>
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
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {/* Row 1 */}
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Spark</h4>
                      <p className="text-white text-xl font-bold">0.65%</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Blaze</h4>
                      <p className="text-white text-xl font-bold">0.91%</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Radiance</h4>
                      <p className="text-white text-xl font-bold">1.10%</p>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Glow</h4>
                      <p className="text-white text-xl font-bold">1.45%</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Luminous</h4>
                      <p className="text-white text-xl font-bold">1.73%</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium">Brilliance</h4>
                      <p className="text-white text-xl font-bold">2.46%</p>
                    </div>
                  </div>
                </div>

                {/* Company Performance */}
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                  <h3 className="font-semibold text-gray-700">Company Performance</h3>
                  <p className="text-gray-500 mt-2">Daily Reporting Indicators</p>
                  {mounted && activeNav === 'Dashboard' && (
                    <Chart data={chartData} options={options} />
                  )}
                </div>
                
              </section>
              <section>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                  <h2 className="text-lg font-semibold text-black">Market Overview</h2>
                  <p className="text-black mt-2">Live cryptocurrency prices and trading volume</p>
                  
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-black">
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Price</th>
                          <th className="py-3 px-4">24h Change</th>
                          <th className="py-3 px-4">Market Cap</th>
                          <th className="py-3 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {trades.map((trade) => (
                          <tr key={trade.symbol} className="border-t">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <img 
                                  src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/${trade.symbol.toLowerCase()}.png`}
                                  alt={trade.symbol}
                                  className="w-6 h-6 mr-2"
                                  onError={(e) => {
                                    e.currentTarget.src = '/default-crypto-icon.png'
                                  }}
                                />
                                <div>
                                  <div className="font-medium text-black font-semibold">{trade.symbol}</div>
                                  <div className="text-sm text-gray-500">{trade.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-black">${trade.price.toLocaleString()}</td>
                            <td className={`py-3 px-4 ${trade.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {trade.change24h.toFixed(2)}%
                            </td>
                            <td className="py-3 px-4 text-black">{trade.volume24h}</td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded">
                                  Trade
                                </button>
                                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded">
                                  Convert
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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