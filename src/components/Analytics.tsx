import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar, Filter, Download } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('1Y');
  const [selectedMetric, setSelectedMetric] = useState('gains');

  const metrics = [
    {
      title: 'Total Realized Gains',
      value: '$45,230.50',
      change: '+12.5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Total Realized Losses',
      value: '$8,450.25',
      change: '-5.2%',
      changeType: 'negative',
      icon: TrendingDown,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Net Capital Gains',
      value: '$36,780.25',
      change: '+18.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Tax Liability (Est.)',
      value: '$7,356.05',
      change: '+18.7%',
      changeType: 'positive',
      icon: PieChart,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const portfolioData = [
    { asset: 'Bitcoin', value: '$125,430', percentage: 45.2, change: '+8.5%' },
    { asset: 'Ethereum', value: '$89,250', percentage: 32.1, change: '+12.3%' },
    { asset: 'USD Coin', value: '$35,000', percentage: 12.6, change: '+0.1%' },
    { asset: 'Solana', value: '$18,750', percentage: 6.8, change: '+25.4%' },
    { asset: 'Others', value: '$9,120', percentage: 3.3, change: '+5.2%' }
  ];

  const monthlyData = [
    { month: 'Jan', gains: 4500, losses: 1200, net: 3300 },
    { month: 'Feb', gains: 6200, losses: 2100, net: 4100 },
    { month: 'Mar', gains: 3800, losses: 800, net: 3000 },
    { month: 'Apr', gains: 8900, losses: 3200, net: 5700 },
    { month: 'May', gains: 5600, losses: 1800, net: 3800 },
    { month: 'Jun', gains: 7200, losses: 2400, net: 4800 },
    { month: 'Jul', gains: 9100, losses: 3100, net: 6000 },
    { month: 'Aug', gains: 6800, losses: 2200, net: 4600 },
    { month: 'Sep', gains: 8400, losses: 2800, net: 5600 },
    { month: 'Oct', gains: 7600, losses: 2600, net: 5000 },
    { month: 'Nov', gains: 9800, losses: 3400, net: 6400 },
    { month: 'Dec', gains: 8200, losses: 2900, net: 5300 }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1 font-sans">Comprehensive analysis of your crypto tax position</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
              <option value="ALL">All Time</option>
            </select>
          </div>
          <button className="flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors duration-200 font-sans">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-display">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 font-display">{metric.value}</p>
                <p className={`text-sm mt-2 font-sans ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} from last period
                </p>
              </div>
              <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${metric.color}`}>
                <metric.icon className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Performance Chart */}
        <div className="lg:col-span-2 xl:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 font-display">Monthly Performance</h2>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-sans ${
                    selectedMetric === 'gains' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Gains
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-sans ${
                    selectedMetric === 'losses' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Losses
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-sans ${
                    selectedMetric === 'net' 
                      ? 'bg-yellow-400 text-gray-900' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Net
                </button>
              </div>
            </div>
            
            {/* Simple Bar Chart Visualization */}
            <div className="space-y-6">
              {monthlyData.slice(-8).map((data, index) => (
                <div key={data.month} className="flex items-center space-x-4">
                  <div className="w-16 text-base font-medium text-gray-600 font-sans">{data.month}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-10 relative overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.max(10, (data[selectedMetric] / Math.max(...monthlyData.map(d => d[selectedMetric]))) * 100)}%` 
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-base font-medium text-gray-700 font-sans">
                      ${data[selectedMetric].toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Breakdown */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Portfolio Breakdown</h2>
            <div className="space-y-6">
              {portfolioData.map((item, index) => (
                <div key={item.asset} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-5 h-5 rounded-full"
                      style={{ 
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                      }}
                    />
                    <div>
                      <p className="text-lg font-medium text-gray-900 font-display">{item.asset}</p>
                      <p className="text-base text-gray-600 font-sans">{item.percentage}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900 font-sans">{item.value}</p>
                    <p className={`text-base font-sans ${
                      item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Tax Summary</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-base text-gray-600 font-sans">Short-term gains</span>
                <span className="text-lg font-medium text-gray-900 font-sans">$12,450.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-base text-gray-600 font-sans">Long-term gains</span>
                <span className="text-lg font-medium text-gray-900 font-sans">$32,780.25</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-base text-gray-600 font-sans">Total losses</span>
                <span className="text-lg font-medium text-red-600 font-sans">-$8,450.25</span>
              </div>
              <div className="flex justify-between items-center py-3 pt-6 border-t-2 border-gray-200">
                <span className="text-lg font-medium text-gray-900 font-display">Net taxable gains</span>
                <span className="font-bold text-2xl text-gray-900 font-display">$36,780.25</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-lg font-medium text-gray-900 font-display">Estimated tax (20%)</span>
                <span className="font-bold text-2xl text-purple-600 font-display">$7,356.05</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Detailed Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">Transaction Volume</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2 font-display">2,847</p>
            <p className="text-base text-gray-600 font-sans">Total transactions processed</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">Win Rate</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2 font-display">68.5%</p>
            <p className="text-base text-gray-600 font-sans">Profitable transactions</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <PieChart className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 font-display">Average Hold Time</h3>
            <p className="text-3xl font-bold text-gray-900 mb-2 font-display">127</p>
            <p className="text-base text-gray-600 font-sans">Days average holding period</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;