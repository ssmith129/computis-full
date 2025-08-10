import React, { useEffect, useMemo, useState } from 'react';
import type { Transaction, ClassificationSuggestion, AuditLogEntry } from '../types/ai';
import { DataTable } from '../components/data-table/DataTable';
import { makeTransactionColumns } from '../components/data-table/transactionsColumns';
import { AIClassificationPanel } from '../components/ai/AIClassificationPanel';
import { AuditLogViewer } from '../components/ai/AuditLogViewer';
import { classifyTransaction } from '../services/ai';
import { addAudit, listAudit } from '../services/audit';

export default function TransactionsDemo(){
  const [rows, setRows] = useState<Transaction[]>([
    { id:'t1', date: new Date().toISOString(), description:'Deposit Coinbase', amount: 1250, classification:'Uncategorized', aiSuggested:true, confidence:'medium', confidencePercentage:78, aiReasoning:'Deposit pattern.', anomalyFlagged:true, anomalySeverity:'caution', anomalyReason:'Unusual deposit size vs. history' },
    { id:'t2', date: new Date().toISOString(), description:'Fee Binance', amount: -15.34, classification:'Fee', aiSuggested:false },
    { id:'t3', date: new Date().toISOString(), description:'ETH Sell', amount: 4200, classification:'Uncategorized', aiSuggested:true, confidence:'high', confidencePercentage:94, aiReasoning:'High value sale with matching ledger entries' },
  ]);
  const [suggestions, setSuggestions] = useState<ClassificationSuggestion[]>([]);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);

  useEffect(()=>{
    Promise.all(rows.filter(r=>r.aiSuggested).map(r => classifyTransaction(r))).then(suggs => setSuggestions(suggs));
    setLogs(listAudit());
  }, []);

  const columns = useMemo(()=> makeTransactionColumns({
    onAcceptSuggestion: async (id)=>{
      addAudit('AI_CLASSIFICATION_ACCEPTED', 'Accepted AI classification', { transactionId: id });
      setLogs(listAudit());
    },
    onRejectSuggestion: async (id)=>{
      addAudit('AI_CLASSIFICATION_REJECTED', 'Rejected AI classification', { transactionId: id });
      setLogs(listAudit());
    }
  }), []);

  return (
    <div className="space-y-8">
      <DataTable data={rows} columns={columns} />

      <AIClassificationPanel
        suggestions={suggestions}
        onAcceptSuggestion={async (sid, category)=>{
          addAudit('AI_CLASSIFICATION_ACCEPTED', `Accepted: ${category}`, { metadata:{ sid, category } });
          setLogs(listAudit());
        }}
        onRejectSuggestion={async (sid)=>{
          addAudit('AI_CLASSIFICATION_REJECTED', 'Rejected', { metadata:{ sid } });
          setLogs(listAudit());
        }}
      />

      <AuditLogViewer logs={logs} />
    </div>
  );
}
