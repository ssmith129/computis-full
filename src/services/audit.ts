import type { AuditLogEntry, AuditEventType } from '../types/ai';

const _logs: AuditLogEntry[] = [];

export function addAudit(eventType: AuditEventType, description: string, payload: Partial<AuditLogEntry> = {}) {
  const entry: AuditLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
    timestamp: new Date().toISOString(),
    eventType,
    description,
    userId: payload.userId ?? 'system',
    transactionId: payload.transactionId,
    metadata: payload.metadata ?? {},
  };
  _logs.unshift(entry);
  return entry;
}

export function listAudit(offset = 0, limit = 50) {
  return _logs.slice(offset, offset + limit);
}
