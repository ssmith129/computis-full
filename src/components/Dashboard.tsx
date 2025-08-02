import React from 'react';
import { TrendingUp, Users, Wallet, FileText, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useNotifications } from './NotificationSystem';

const stats = [
  {
    title: 'Total Transactions',
    value: '2,847',
    change: '+12%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Active Clients',
    value: '24',
    change: '+3',
    changeType: 'positive',
    icon: Users,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Connected Wallets',
    value: '156',
    change: '+8',
    changeType: 'positive',
    icon: Wallet,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Reports Generated',
    value: '89',
    change: '+15%',
    changeType: 'positive',
    icon: FileText,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'AI Classification',
    description: 'Classified 24 Bitcoin transactions as Income',
    time: '2 hours ago',
    status: 'completed',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'Anomaly Detected',
    description: 'Unusual trading volume detected for Client ABC',
    time: '4 hours ago',
    status: 'warning',
    icon: AlertTriangle,
    color: 'text-yellow-500'
  },
  {
    id: 3,
    type: 'Report Generated',
    description: 'IRS 8949 form completed for Q4 2023',
    time: '6 hours ago',
    status: 'completed',
    icon: FileText,
    color: 'text-blue-500'
  },
  {
    id: 4,
    type: 'Data Import',
    description: 'Imported 156 transactions from Coinbase',
    time: '1 day ago',
    status: 'completed',
    icon: TrendingUp,
    color: 'text-purple-500'
  }
];

const aiInsights = [
  {
    title: 'High Confidence Classifications',
    value: '89%',
    description: 'of transactions classified with 90%+ confidence',
    trend: 'up'
  },
  {
    title: 'Anomalies Detected',
    value: '12',
    description: 'potential issues flagged for review',
    trend: 'neutral'
  },
  {
    title: 'Time Saved',
    value: '47 hrs',
    description: 'estimated manual work automated this month',
    trend: 'up'
  }
];

interface DashboardProps {
  onWorkflowOpen?: (workflow: string) => void;
}

export default function Dashboard({ onWorkflowOpen }: DashboardProps) {
  const { addNotification } = useNotifications();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'import':
        addNotification({
          type: 'info',
          title: 'Import Started',
          message: 'Opening transaction import wizard...',
          duration: 2000
        });
        break;
      case 'report':
        addNotification({
          type: 'info',
          title: 'Report Generation',
          message: 'Preparing your tax report...',
          duration: 3000
        });
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: 'Report Ready',
            message: 'Your IRS Form 8949 is ready for download.',
            action: {
              label: 'Download',
              onClick: () => console.log('Download report')
            }
          });
        }, 3000);
        break;
      case 'client':
        addNotification({
          type: 'success',
          title: 'Client Added',
          message: 'New client profile has been created successfully.',
          duration: 3000
        });
        break;
      case 'wallet':
        addNotification({
          type: 'info',
          title: 'Wallet Connection',
          message: 'Connecting to wallet and syncing transactions...',
          duration: 4000
        });
        break;
    }
  };

  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-display">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-3 font-display">{stat.value}</p>
                <p className={`text-sm mt-1 font-sans ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${stat.color} hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 font-display">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans font-medium">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-5 p-5 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className={`h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ${activity.color} hover:scale-110 transition-transform duration-200`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 font-display">{activity.type}</p>
                    <p className="text-sm text-gray-600 mt-2 font-sans">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1 font-sans">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === 'completed' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 font-sans">
                        Completed
                      </span>
                    )}
                    {activity.status === 'warning' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 font-sans">
                        Review
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">AI Insights</h2>
            <div className="space-y-8">
              {aiInsights.map((insight, index) => (
                <div key={index} className="hover:bg-gray-50 p-4 rounded-xl transition-colors duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl font-bold text-gray-900 font-display">{insight.value}</span>
                    {insight.trend === 'up' && (
                      <TrendingUp className="h-5 w-5 text-green-500 hover:scale-110 transition-transform duration-200" />
                    )}
                  </div>
                  <p className="text-base font-medium text-gray-900 font-display">{insight.title}</p>
                  <p className="text-sm text-gray-600 mt-2 font-sans">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Quick Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={() => onWorkflowOpen?.('import-transactions')}
                className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans"
              >
                <span className="text-base font-medium text-gray-900">Import Transactions</span>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </button>
              <button 
                onClick={() => onWorkflowOpen?.('generate-report')}
                className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans"
              >
                <span className="text-base font-medium text-gray-900">Generate Report</span>
                <FileText className="h-5 w-5 text-gray-400" />
              </button>
              <button 
                onClick={() => onWorkflowOpen?.('add-client')}
                className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans"
              >
                <span className="text-base font-medium text-gray-900">Add Client</span>
                <Users className="h-5 w-5 text-gray-400" />
              </button>
              <button 
                onClick={() => onWorkflowOpen?.('connect-wallet')}
                className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans"
              >
                <span className="text-base font-medium text-gray-900">Connect Wallet</span>
                <Wallet className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}