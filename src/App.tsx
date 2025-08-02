import React, { useState } from 'react';
import { NotificationProvider } from './components/NotificationSystem';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Wallets from './components/Wallets';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Preferences from './components/Preferences';
import RuleEngine from './components/RuleEngine';
import AccountSettings from './components/AccountSettings';
import Exports from './components/Exports';
import PageHeader from './components/PageHeader';
import TransactionsTable from './components/TransactionsTable';
import RuleBuilder from './components/RuleBuilder';
import AnomalyFlags from './components/AnomalyFlags';
import AuditTrail from './components/AuditTrail';

function App() {
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const toggleAuditTrail = () => {
    setIsAuditTrailOpen(!isAuditTrailOpen);
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="p-8">
            <Dashboard />
          </div>
        );
      case 'clients':
        return (
          <div className="p-8">
            <Clients />
          </div>
        );
      case 'wallets':
        return (
          <div className="p-8">
            <Wallets />
          </div>
        );
      case 'reports':
        return (
          <div className="p-8">
            <Reports />
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
            <PageHeader onAuditTrailToggle={toggleAuditTrail} />
            <TransactionsTable />
            <RuleBuilder />
            <AnomalyFlags />
          </>
        );
    }
  };
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        
        <main className="ml-72 pt-20 min-h-screen">
          {renderContent()}
        </main>

        <AuditTrail isOpen={isAuditTrailOpen} onClose={() => setIsAuditTrailOpen(false)} />
        
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