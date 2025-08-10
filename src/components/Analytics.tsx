import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, PieChart, BarChart3, Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import StatusIndicator from './StatusIndicator';
import InteractiveButton from './InteractiveButton';
import { useNotifications } from './NotificationSystem';

interface PerformanceMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'total-gains',
    title: 'Total Realized Gains',
    value: '$156,240',
    change: '+23.5%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'total-losses',
    title: 'Total Realized Losses',
    value: '$45,680',
    change: '-12.3%',
    changeType: 'negative',
    icon: DollarSign,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'net-gains',
    title: 'Net Capital Gains',
    value: '$110,560',
    change: '+18.7%',
    changeType: 'positive',
    icon: BarChart3,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'tax-liability',
    title: 'Estimated Tax Liability',
    value: '$27,640',
    change: '+18.7%',
    changeType: 'positive',
    icon: PieChart,
    color: 'bg-purple-100 text-purple-600'
  }
];

const portfolioData: ChartData[] = [
  { id: 'btc', label: 'Bitcoin', value: 45, color: '#f7931a' },
  { id: 'eth', label: 'Ethereum', value: 30, color: '#627eea' },
  { id: 'sol', label: 'Solana', value: 15, color: '#9945ff' },
  { id: 'others', label: 'Others', value: 10, color: '#6b7280' }
];

const topTransactions = [
  {
    id: '1',
    date: '2023-12-15',
    description: 'Bitcoin Sale',
    amount: '$52,340',
    gainLoss: '+$12,450',
    type: 'sale'
  },
  {
    id: '2',
    date: '2023-12-14',
    description: 'Ethereum Purchase',
    amount: '$28,440',
    gainLoss: '-$3,200',
    type: 'purchase'
  },
  {
    id: '3',
    date: '2023-12-13',
    description: 'Solana Swap',
    amount: '$16,050',
    gainLoss: '+$4,800',
    type: 'swap'
  }
];

export default function Analytics() {
  const { addNotification } = useNotifications();
  const [selectedPeriod, setSelectedPeriod] = useState('YTD');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const periods = ['1M', '3M', '6M', 'YTD', '1Y', 'All'];

  const handlePeriodChange = async (period: string) => {
    if (period === selectedPeriod) return;
    
    setIsLoading(true);
    setSelectedPeriod(period);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastUpdated(new Date());
      
      addNotification({
        type: 'success',
        title: 'Analytics Updated',
        message: `Portfolio analytics refreshed for ${period} period`,
        duration: 3000
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to refresh analytics data',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAnalytics = () => {
    addNotification({
      type: 'info',
      title: 'Export Started',
      message: 'Preparing analytics export...',
      duration: 3000
    });
    
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Export Ready',
        message: 'Analytics report is ready for download',
        action: {
          label: 'Download',
          onClick: () => console.log('Download analytics')
        }
      });
    }, 3000);
  };

  const handleRefreshData = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastUpdated(new Date());
      
      addNotification({
        type: 'success',
        title: 'Data Refreshed',
        message: 'All analytics data has been updated',
        duration: 3000
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Refresh Failed',
        message: 'Unable to refresh data at this time',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 font-display">Crypto Portfolio Analytics</h2>
          <p className="text-gray-600 mt-1 font-sans">
            Performance insights and tax implications analysis
          </p>
          <p className="text-sm text-gray-500 mt-1 font-sans">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <InteractiveButton 
            variant="secondary" 
            size="md" 
            icon={RefreshCw}
            onClick={handleRefreshData}
            loading={isLoading}
          >
            Refresh
          </InteractiveButton>
          <InteractiveButton 
            variant="secondary" 
            size="md" 
            icon={Filter}
          >
            Filters
          </InteractiveButton>
          <InteractiveButton 
            variant="primary" 
            size="md" 
            icon={Download}
            onClick={handleExportAnalytics}
          >
            Export Report
          </InteractiveButton>
        </div>
      </div>

      {/* Period Selection */}
      <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1 shadow-sm w-fit">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => handlePeriodChange(period)}
            disabled={isLoading}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105 font-sans ${
              selectedPeriod === period
                ? 'bg-yellow-400 text-gray-900 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <AnimatedCard key={metric.id} className="p-6" hover>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 font-display">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2 font-display">{metric.value}</p>
                <p className={`text-sm mt-1 font-sans ${
                  metric.changeType === 'positive' ? 'text-green-600' : 
                  metric.changeType === 'negative' ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {metric.change} vs last period
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${metric.color} hover:scale-105 transition-transform duration-150`}>
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio Composition */}
        <div className="lg:col-span-2">
          <AnimatedCard className="p-6" hover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-display">Portfolio Composition</h3>
              <StatusIndicator 
                status="success" 
                label="Up to date"
                size="sm"
              />
            </div>
            
            {/* Simple bar chart representation */}
            <div className="space-y-4">
              {portfolioData.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-900 font-sans">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.value}%`, 
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 font-sans w-10 text-right">
                      {item.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        {/* Top Transactions */}
        <div>
          <AnimatedCard className="p-6" hover>
            <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Top Transactions</h3>
            <div className="space-y-4">
              {topTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 font-sans">{transaction.description}</h4>
                    <span className={`text-sm font-medium font-sans ${
                      transaction.gainLoss.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.gainLoss}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 font-sans">
                    <span>{transaction.date}</span>
                    <span>{transaction.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Tax Year Summary */}
      <AnimatedCard className="p-6" hover>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 font-display">Tax Year 2023 Summary</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 font-sans">January 1 - December 31, 2023</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-gray-900 font-display">1,247</p>
            <p className="text-sm text-gray-600 font-sans">Total Transactions</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600 font-display">$110,560</p>
            <p className="text-sm text-gray-600 font-sans">Net Capital Gains</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600 font-display">$27,640</p>
            <p className="text-sm text-gray-600 font-sans">Tax Liability (Est.)</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 font-sans">Tax Optimization Opportunity</h4>
              <p className="text-sm text-blue-700 font-sans">
                Consider harvesting $8,200 in unrealized losses before year-end to reduce tax liability.
              </p>
            </div>
          </div>
        </div>
      </AnimatedCard>

      {/* Loading State Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
              <span className="font-medium text-gray-900 font-sans">Updating analytics...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}