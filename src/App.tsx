import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './components/NotificationSystem';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Clients from './components/Clients';
import ClientProfile from './components/ClientProfile';
import Wallets from './components/Wallets';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Preferences from './components/Preferences';
import RuleEngine from './components/RuleEngine';
import AccountSettings from './components/AccountSettings';
import Exports from './components/Exports';
import PageHeader from './components/PageHeader';
import TransactionsTable from './components/TransactionsTable';
import TransactionDetail from './components/TransactionDetail';
import RuleBuilder from './components/RuleBuilder';
import AnomalyFlags from './components/AnomalyFlags';
import AuditTrail from './components/AuditTrail';
import ImportWizard from './components/ImportWizard';
import BulkActions from './components/BulkActions';
import SearchFilters from './components/SearchFilters';
import ImportTransactionsWorkflow from './components/ImportTransactionsWorkflow';
import GenerateReportWorkflow from './components/GenerateReportWorkflow';
import AddClientWorkflow from './components/AddClientWorkflow';
import ConnectWalletWorkflow from './components/ConnectWalletWorkflow';

function App() {
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isImportWizardOpen, setIsImportWizardOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState({});
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleAuditTrail = () => {
    setIsAuditTrailOpen(!isAuditTrailOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTransactionSelect = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  const handleBackToTransactions = () => {
    setSelectedTransactionId(null);
  };

  const handleBackToClients = () => {
    setSelectedClientId(null);
  };

  const handleWorkflowOpen = (workflow: string) => {
    setActiveWorkflow(workflow);
  };

  const handleWorkflowClose = () => {
    setActiveWorkflow(null);
  };

  const renderContent = () => {
    // Workflow Views - Full screen
    if (activeWorkflow) {
      switch (activeWorkflow) {
        case 'import-transactions':
          return <ImportTransactionsWorkflow onBack={handleWorkflowClose} />;
        case 'generate-report':
          return <GenerateReportWorkflow onBack={handleWorkflowClose} />;
        case 'add-client':
          return <AddClientWorkflow onBack={handleWorkflowClose} />;
        case 'connect-wallet':
          return <ConnectWalletWorkflow onBack={handleWorkflowClose} />;
        default:
          return null;
      }
    }

    // Transaction Detail View
    if (selectedTransactionId) {
      return (
        <div className="responsive-padding">
          <TransactionDetail 
            transactionId={selectedTransactionId} 
            onBack={handleBackToTransactions}
          />
        </div>
      );
    }

    // Client Profile View
    if (selectedClientId) {
      return (
        <div className="responsive-padding">
          <ClientProfile 
            clientId={selectedClientId} 
            onBack={handleBackToClients}
          />
        </div>
      );
    }

    // Standard module views
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="responsive-padding">
            <Dashboard onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'analytics':
        return (
          <div className="responsive-padding">
            <Analytics />
          </div>
        );
      case 'clients':
        return (
          <div className="responsive-padding">
            <Clients onClientSelect={handleClientSelect} onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'wallets':
        return (
          <div className="responsive-padding">
            <Wallets onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'reports':
        return (
          <div className="responsive-padding">
            <Reports onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'settings':
        return (
          <div className="responsive-padding">
            <Settings />
          </div>
        );
      case 'preferences':
        return (
          <div className="responsive-padding">
            <Preferences />
          </div>
        );
      case 'rules':
        return (
          <div className="responsive-padding">
            <RuleEngine />
          </div>
        );
      case 'account':
        return (
          <div className="responsive-padding">
            <AccountSettings />
          </div>
        );
      case 'exports':
        return (
          <div className="responsive-padding">
            <Exports />
          </div>
        );
      case 'transactions':
      default:
        return (
          <>
            <SearchFilters onFiltersChange={setSearchFilters} />
            <PageHeader onAuditTrailToggle={toggleAuditTrail} />
            <TransactionsTable 
              onTransactionSelect={handleTransactionSelect}
              selectedTransactions={selectedTransactions}
              onSelectionChange={setSelectedTransactions}
            />
            <RuleBuilder />
            <AnomalyFlags />
            <BulkActions 
              selectedCount={selectedTransactions.length}
              onClose={() => setSelectedTransactions([])}
            />
          </>
        );
    }
  };

  // Main layout classes based on state
  const getMainLayoutClasses = () => {
    if (activeWorkflow) {
      return 'workflow-container';
    }
    
    if (isMobile) {
      return `pt-16 min-h-screen transition-all duration-300 ${
        isSidebarOpen ? 'ml-0' : 'ml-0'
      }`;
    }
    
    return 'ml-64 pt-16 min-h-screen transition-all duration-300';
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-100 relative">
        {/* Header */}
        <Header 
          onWorkflowOpen={handleWorkflowOpen} 
          onMenuToggle={toggleSidebar}
          isMobile={isMobile}
        />
        
        {/* Sidebar */}
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isMobile={isMobile}
        />
        
        {/* Main Content */}
        <main
          className={getMainLayoutClasses()}
          role="main"
          aria-label="Crypto tax management workspace"
          style={{ marginLeft: '256px' }}
        >
          <div className={activeWorkflow ? 'w-full' : 'content-container'}>
            {renderContent()}
          </div>
        </main>

        {/* Audit Trail Sidebar */}
        <AuditTrail 
          isOpen={isAuditTrailOpen} 
          onClose={() => setIsAuditTrailOpen(false)} 
        />
        
        {/* Import Wizard Modal */}
        <ImportWizard 
          isOpen={isImportWizardOpen} 
          onClose={() => setIsImportWizardOpen(false)} 
        />
        
        {/* Mobile Sidebar Overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Audit Trail Overlay */}
        {isAuditTrailOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => setIsAuditTrailOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </NotificationProvider>
  );
}

export default App;
