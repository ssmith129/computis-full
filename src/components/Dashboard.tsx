import React from 'react';
import { TrendingUp, Users, Wallet, FileText, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useNotifications } from './NotificationSystem';
import AnimatedCard from './AnimatedCard';
import InteractiveButton from './InteractiveButton';
import StatusIndicator from './StatusIndicator';
import FloatingActionButton from './FloatingActionButton';

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
    priority: 'normal'
  },
  {
    id: 2,
    type: 'Client Import',
    description: 'John Smith uploaded new transaction data',
    time: '4 hours ago',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 3,
    type: 'Report Generation',
    description: 'Q3 tax report completed for Sarah Johnson',
    time: '1 day ago',
    status: 'completed',
    priority: 'normal'
  },
  {
    id: 4,
    type: 'Anomaly Detection',
    description: 'Suspicious transaction pattern detected in wallet 0x4f2a...',
    time: '2 days ago',
    status: 'flagged',
    priority: 'high'
  },
  {
    id: 5,
    type: 'Compliance Check',
    description: 'All transactions validated for regulatory compliance',
    time: '3 days ago',
    status: 'completed',
    priority: 'normal'
  }
];

const upcomingTasks = [
  {
    id: 1,
    task: 'Review flagged transactions',
    dueDate: 'Today',
    priority: 'high',
    client: 'Multiple clients'
  },
  {
    id: 2,
    task: 'Generate monthly reports',
    dueDate: 'Tomorrow',
    priority: 'medium',
    client: 'All active clients'
  },
  {
    id: 3,
    task: 'Client onboarding session',
    dueDate: 'Friday',
    priority: 'low',
    client: 'TechCorp Inc.'
  }
];

interface DashboardProps {
  onWorkflowOpen?: (workflow: string) => void;
}

export default function Dashboard({ onWorkflowOpen }: DashboardProps) {
  const { addNotification } = useNotifications();

  const floatingActions = [
    {
      label: 'Import Transactions',
      icon: TrendingUp,
      onClick: () => onWorkflowOpen?.('import-transactions'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'Generate Report',
      icon: FileText,
      onClick: () => onWorkflowOpen?.('generate-report'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Add Client',
      icon: Users,
      onClick: () => onWorkflowOpen?.('add-client'),
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      label: 'Connect Wallet',
      icon: Wallet,
      onClick: () => onWorkflowOpen?.('connect-wallet'),
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];
  
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'import':
        onWorkflowOpen?.('import-transactions');
        addNotification({
          type: 'info',
          title: 'Import Started',
          message: 'Opening import workflow...',
          duration: 2000
        });
        break;
      case 'report':
        onWorkflowOpen?.('generate-report');
        addNotification({
          type: 'info',
          title: 'Report Generator',
          message: 'Opening report generation workflow...',
          duration: 2000
        });
        break;
      case 'client':
        onWorkflowOpen?.('add-client');
        addNotification({
          type: 'info',
          title: 'Client Management',
          message: 'Opening client addition workflow...',
          duration: 2000
        });
        break;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'flagged':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="content-wrapper">
      {/* Page Header with proper semantic structure */}
      <div className="section-gap">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="heading-1">Dashboard</h1>
            <p className="text-secondary">Overview of your crypto tax management platform</p>
          </div>
          <div className="flex space-x-3">
            <InteractiveButton
              variant="outline"
              size="md"
              className="btn-typography-md"
              onClick={() => handleQuickAction('import')}
            >
              Quick Import
            </InteractiveButton>
            <InteractiveButton
              variant="primary"
              size="md"
              className="btn-typography-md"
              onClick={() => handleQuickAction('report')}
            >
              Generate Report
            </InteractiveButton>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="section-gap">
        <h2 className="heading-3 element-gap">Key Metrics</h2>
        <div className="dashboard-stats-grid">
          {stats.map((stat, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <div className="card-optimized">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-caption">
                      {stat.title}
                    </p>
                    <p className="heading-4 font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className={`text-small font-medium ${
                      stat.changeType === 'positive' ? 'text-success' : 'text-error'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-grid">
        {/* Recent Activity */}
        <div className="space-component">
          <h2 className="heading-3 element-gap">Recent Activity</h2>
          <AnimatedCard>
            <div className="card-optimized">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body font-medium text-primary">
                        {activity.type}
                      </p>
                      <p className="text-secondary">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-small text-muted">
                          {activity.time}
                        </span>
                        <span className={`badge-typography px-2 py-1 rounded-full ${getPriorityColor(activity.priority)}`}>
                          {activity.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <InteractiveButton
                  variant="ghost"
                  size="sm"
                  className="w-full btn-typography-sm"
                  onClick={() => addNotification({
                    type: 'info',
                    title: 'Activity Log',
                    message: 'Opening full activity history...',
                    duration: 2000
                  })}
                >
                  View All Activity
                </InteractiveButton>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div>
            <h3 className="heading-4 element-gap">Upcoming Tasks</h3>
            <AnimatedCard delay={200}>
              <div className="card-optimized">
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-1">
                        <p className="text-body font-medium text-primary">
                          {task.task}
                        </p>
                        <p className="text-caption">
                          {task.client}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-small text-muted">
                          {task.dueDate}
                        </p>
                        <span className={`badge-typography px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="heading-4 element-gap">Quick Actions</h3>
            <AnimatedCard delay={300}>
              <div className="card-optimized">
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleQuickAction('import')}
                    className="btn-typography-md flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Import Transactions
                  </button>
                  <button
                    onClick={() => handleQuickAction('client')}
                    className="btn-typography-md flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Add New Client
                  </button>
                  <button
                    onClick={() => handleQuickAction('report')}
                    className="btn-typography-md flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Status Overview */}
          <div>
            <h3 className="heading-4 element-gap">System Status</h3>
            <AnimatedCard delay={400}>
              <div className="card-optimized">
                <div className="space-y-3">
                  <StatusIndicator
                    label="AI Classification Engine"
                    status="active"
                    description="Processing transactions in real-time"
                  />
                  <StatusIndicator
                    label="Blockchain Sync"
                    status="active"
                    description="Latest block: 15,847,392"
                  />
                  <StatusIndicator
                    label="Data Backup"
                    status="warning"
                    description="Last backup: 2 hours ago"
                  />
                  <StatusIndicator
                    label="API Connections"
                    status="active"
                    description="All exchanges connected"
                  />
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton actions={floatingActions} />
    </div>
  );
}
