/**
 * Validation utilities for form inputs and data
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address format
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email.trim());
  
  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid email address'
  };
};

/**
 * Validate phone number format
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: 'Phone number must be at least 10 digits' };
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, error: 'Phone number cannot exceed 15 digits' };
  }

  return { isValid: true };
};

/**
 * Validate required string fields
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  return { isValid: true };
};

/**
 * Validate numeric inputs
 */
export const validateNumber = (value: string | number, min?: number, max?: number): ValidationResult => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }

  if (min !== undefined && num < min) {
    return { isValid: false, error: `Value must be at least ${min}` };
  }

  if (max !== undefined && num > max) {
    return { isValid: false, error: `Value cannot exceed ${max}` };
  }

  return { isValid: true };
};

/**
 * Validate date inputs
 */
export const validateDate = (date: string): ValidationResult => {
  if (!date || typeof date !== 'string') {
    return { isValid: false, error: 'Date is required' };
  }

  const parsedDate = new Date(date);
  
  if (isNaN(parsedDate.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' };
  }

  return { isValid: true };
};

/**
 * Validate date range
 */
export const validateDateRange = (startDate: string, endDate: string): ValidationResult => {
  const startValidation = validateDate(startDate);
  if (!startValidation.isValid) {
    return { isValid: false, error: `Start date: ${startValidation.error}` };
  }

  const endValidation = validateDate(endDate);
  if (!endValidation.isValid) {
    return { isValid: false, error: `End date: ${endValidation.error}` };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    return { isValid: false, error: 'End date must be after start date' };
  }

  return { isValid: true };
};

/**
 * Sanitize HTML to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate and sanitize text input
 */
export const sanitizeInput = (input: string, maxLength: number = 255): ValidationResult & { sanitized?: string } => {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Input is required' };
  }

  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Input cannot be empty' };
  }

  if (trimmed.length > maxLength) {
    return { isValid: false, error: `Input cannot exceed ${maxLength} characters` };
  }

  const sanitized = sanitizeHtml(trimmed);
  
  return { isValid: true, sanitized };
};