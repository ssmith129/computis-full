/**
 * Application constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000 // 1 second
} as const;

// Application limits
export const LIMITS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_TRANSACTIONS_PER_IMPORT: 10000,
  MAX_CLIENTS: 1000,
  MAX_WALLETS_PER_CLIENT: 50,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  NOTIFICATION_AUTO_DISMISS: 5000 // 5 seconds
} as const;

// Supported file formats
export const SUPPORTED_FORMATS = {
  IMPORT: ['.csv', '.xlsx', '.xls', '.json'],
  EXPORT: ['PDF', 'Excel', 'CSV', 'JSON'],
  IMAGES: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
} as const;

// Transaction types
export const TRANSACTION_TYPES = [
  'receive',
  'send', 
  'swap',
  'merge',
  'split',
  'fee',
  'mining',
  'staking',
  'airdrop',
  'fork'
] as const;

// Classification categories
export const CLASSIFICATION_CATEGORIES = [
  'income',
  'expense', 
  'trade',
  'transfer',
  'gift',
  'donation',
  'loss',
  'unclassified'
] as const;

// Accounting methods
export const ACCOUNTING_METHODS = [
  'FIFO',
  'LIFO', 
  'HIFO',
  'specific_identification',
  'average_cost'
] as const;

// Asset types
export const ASSET_TYPES = {
  CRYPTOCURRENCY: 'cryptocurrency',
  FIAT: 'fiat',
  STABLECOIN: 'stablecoin',
  NFT: 'nft',
  TOKEN: 'token'
} as const;

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  UNSUPPORTED_FORMAT: 'UNSUPPORTED_FORMAT'
} as const;

// Regular expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  WALLET_ADDRESS: {
    BITCOIN: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
    ETHEREUM: /^0x[a-fA-F0-9]{40}$/,
    SOLANA: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  },
  TAX_ID: {
    SSN: /^\d{3}-\d{2}-\d{4}$/,
    EIN: /^\d{2}-\d{7}$/
  }
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[number];
export type ClassificationCategory = typeof CLASSIFICATION_CATEGORIES[number];
export type AccountingMethod = typeof ACCOUNTING_METHODS[number];
export type AssetType = typeof ASSET_TYPES[keyof typeof ASSET_TYPES];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];