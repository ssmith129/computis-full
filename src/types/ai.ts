export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type AnomalySeverity = 'critical' | 'caution' | 'resolved';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  classification: string;
  aiSuggested?: boolean;
  confidence?: ConfidenceLevel;
  confidencePercentage?: number;
  aiReasoning?: string;
  anomalyFlagged?: boolean;
  anomalySeverity?: AnomalySeverity;
  anomalyReason?: string;
}

export interface ClassificationSuggestion {
  id: string;
  transactionId: string;
  suggestedCategory: string;
  confidence: ConfidenceLevel;
  confidencePercentage: number;
  reasoning: string;
  alternativeSuggestions?: string[];
}

export type AuditEventType =
  | 'AI_FLAG_TRIGGERED'
  | 'AI_CLASSIFICATION_ACCEPTED'
  | 'AI_CLASSIFICATION_REJECTED'
  | 'USER_OVERRIDE'
  | 'ANOMALY_RESOLVED'
  | 'CONFIDENCE_UPDATED';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  eventType: AuditEventType;
  description: string;
  userId: string;
  transactionId?: string;
  metadata: Record<string, any>;
}
