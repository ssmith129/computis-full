import { useCallback } from 'react';
import { useNotifications } from '../components/NotificationSystem';

export interface AppError extends Error {
  code?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

export const useErrorHandler = () => {
  const { addNotification } = useNotifications();

  const handleError = useCallback((error: AppError | Error, context?: Record<string, any>) => {
    console.error('Application Error:', error, context);

    const appError = error as AppError;
    const severity = appError.severity || 'medium';
    const errorContext = { ...appError.context, ...context };

    // Log error for monitoring (in production, send to error tracking service)
    if (process.env.NODE_ENV === 'production') {
      // Replace with your error tracking service (Sentry, LogRocket, etc.)
      // errorTrackingService.captureException(error, errorContext);
    }

    // Show user-friendly notification
    const getNotificationType = (severity: string) => {
      switch (severity) {
        case 'critical':
        case 'high':
          return 'error' as const;
        case 'medium':
          return 'warning' as const;
        case 'low':
        default:
          return 'info' as const;
      }
    };

    const getUserMessage = (error: Error) => {
      // Map technical errors to user-friendly messages
      if (error.message.includes('Network')) {
        return 'Unable to connect to server. Please check your internet connection.';
      }
      
      if (error.message.includes('Unauthorized')) {
        return 'Your session has expired. Please log in again.';
      }
      
      if (error.message.includes('Validation')) {
        return 'Please check your input and try again.';
      }

      if (error.message.includes('Not Found')) {
        return 'The requested resource could not be found.';
      }

      // Generic fallback
      return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
    };

    addNotification({
      type: getNotificationType(severity),
      title: 'Error',
      message: getUserMessage(error),
      duration: severity === 'critical' ? 0 : 5000, // Critical errors don't auto-dismiss
      action: severity === 'critical' ? {
        label: 'Retry',
        onClick: () => window.location.reload()
      } : undefined
    });
  }, [addNotification]);

  const createErrorHandler = useCallback((context?: Record<string, any>) => {
    return (error: Error) => handleError(error, context);
  }, [handleError]);

  const wrapAsyncOperation = useCallback(async <T>(
    operation: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T | null> => {
    try {
      return await operation();
    } catch (error) {
      handleError(error as Error, context);
      return null;
    }
  }, [handleError]);

  return {
    handleError,
    createErrorHandler,
    wrapAsyncOperation
  };
};