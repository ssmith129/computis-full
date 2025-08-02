import React from 'react';
import { TrendingUp, Users, Wallet, FileText, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';

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

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-sans">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2 font-sans">{stat.value}</p>
                <p className={`text-sm mt-1 font-sans ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color} hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-sans">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className={`h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color} hover:scale-110 transition-transform duration-200`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 font-sans">{activity.type}</p>
                    <p className="text-sm text-gray-600 mt-1 font-sans">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1 font-sans">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === 'completed' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 font-sans">
                        Completed
                      </span>
                    )}
                    {activity.status === 'warning' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 font-sans">
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
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">AI Insights</h2>
            <div className="space-y-6">
              {aiInsights.map((insight, index) => (
                <div key={index} className="hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900 font-sans">{insight.value}</span>
                    {insight.trend === 'up' && (
                      <TrendingUp className="h-4 w-4 text-green-500 hover:scale-110 transition-transform duration-200" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900 font-sans">{insight.title}</p>
                  <p className="text-xs text-gray-600 mt-1 font-sans">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                <span className="text-sm font-medium text-gray-900">Import Transactions</span>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                <span className="text-sm font-medium text-gray-900">Generate Report</span>
                <FileText className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                <span className="text-sm font-medium text-gray-900">Add Client</span>
                <Users className="h-4 w-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
                <span className="text-sm font-medium text-gray-900">Connect Wallet</span>
                <Wallet className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}