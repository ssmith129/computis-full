import React, { useState } from 'react';
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

  const toggleAuditTrail = () => {
    setIsAuditTrailOpen(!isAuditTrailOpen);
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
    // Workflow Views
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
        <div className="p-8">
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
        <div className="p-8">
          <ClientProfile 
            clientId={selectedClientId} 
            onBack={handleBackToClients}
          />
        </div>
      );
    }

    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="p-8">
            <Dashboard onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8">
            <Analytics />
          </div>
        );
      case 'clients':
        return (
          <div className="p-8">
            <Clients onClientSelect={handleClientSelect} onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'wallets':
        return (
          <div className="p-8">
            <Wallets onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'reports':
        return (
          <div className="p-8">
            <Reports onWorkflowOpen={handleWorkflowOpen} />
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <Settings />
          </div>
        );
      case 'preferences':
        return (
          <div className="p-8">
            <Preferences />
          </div>
        );
      case 'rules':
        return (
          <div className="p-8">
            <RuleEngine />
          </div>
        );
      case 'account':
        return (
          <div className="p-8">
            <AccountSettings />
          </div>
        );
      case 'exports':
        return (
          <div className="p-8">
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

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-100">
        <Header onWorkflowOpen={handleWorkflowOpen} />
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        
        <main className={`${activeWorkflow ? 'ml-0 pt-0 flex items-center justify-center' : 'ml-48 pt-12'} min-h-screen transition-all duration-200`}>
          <div className={`${activeWorkflow ? 'w-full' : 'max-w-screen-2xl mx-auto px-6'}`}>
            {renderContent()}
          </div>
        </main>

        <AuditTrail isOpen={isAuditTrailOpen} onClose={() => setIsAuditTrailOpen(false)} />
        
        <ImportWizard 
          isOpen={isImportWizardOpen} 
          onClose={() => setIsImportWizardOpen(false)} 
        />
        
        {/* Overlay */}
        {isAuditTrailOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => setIsAuditTrailOpen(false)}
          />
        )}
      </div>
    </NotificationProvider>
  );
}

export default App;