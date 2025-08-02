import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Wallets from './components/Wallets';
import Reports from './components/Reports';
import PageHeader from './components/PageHeader';
import TransactionsTable from './components/TransactionsTable';
import RuleBuilder from './components/RuleBuilder';
import AnomalyFlags from './components/AnomalyFlags';
import AuditTrail from './components/AuditTrail';

function App() {
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('transactions');

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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      
      <main className="ml-64 pt-16 min-h-screen">
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
  );
}

export default App;