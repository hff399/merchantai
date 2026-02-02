/**
 * Application error classes
 */

// Error codes for consistent error handling
export enum ErrorCode {
  // General errors
  UNKNOWN = 'UNKNOWN',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',

  // User errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_BLOCKED = 'USER_BLOCKED',
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',

  // Session errors
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  INVALID_SESSION_STATE = 'INVALID_SESSION_STATE',

  // Order errors
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  ORDER_ALREADY_PROCESSED = 'ORDER_ALREADY_PROCESSED',
  ORDER_CREATION_FAILED = 'ORDER_CREATION_FAILED',

  // Payment errors
  PAYMENT_NOT_FOUND = 'PAYMENT_NOT_FOUND',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_CANCELLED = 'PAYMENT_CANCELLED',

  // AI/Generation errors
  GENERATION_FAILED = 'GENERATION_FAILED',
  PROMPT_TOO_LONG = 'PROMPT_TOO_LONG',
  IMAGE_PROCESSING_FAILED = 'IMAGE_PROCESSING_FAILED',

  // Storage errors
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  DOWNLOAD_FAILED = 'DOWNLOAD_FAILED',

  // External service errors
  SUPABASE_ERROR = 'SUPABASE_ERROR',
  OPENAI_ERROR = 'OPENAI_ERROR',
  GEMINI_ERROR = 'GEMINI_ERROR',
  YOOKASSA_ERROR = 'YOOKASSA_ERROR',
}

// Base application error class
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN,
    statusCode = 500,
    isOperational = true,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory methods for common errors
  static notFound(resource: string, id?: string): AppError {
    return new AppError(
      `${resource} not found${id ? `: ${id}` : ''}`,
      ErrorCode.NOT_FOUND,
      404
    );
  }

  static validation(message: string, details?: Record<string, unknown>): AppError {
    return new AppError(message, ErrorCode.VALIDATION, 400, true, details);
  }

  static insufficientCredits(required: number, available: number): AppError {
    return new AppError(
      `Insufficient credits: need ${required}, have ${available}`,
      ErrorCode.INSUFFICIENT_CREDITS,
      400,
      true,
      { required, available }
    );
  }

  static sessionExpired(): AppError {
    return new AppError('Session expired', ErrorCode.SESSION_EXPIRED, 400);
  }

  static sessionNotFound(): AppError {
    return new AppError('Session not found', ErrorCode.SESSION_NOT_FOUND, 400);
  }

  static generationFailed(reason?: string): AppError {
    return new AppError(
      `Generation failed${reason ? `: ${reason}` : ''}`,
      ErrorCode.GENERATION_FAILED,
      500
    );
  }

  static uploadFailed(reason?: string): AppError {
    return new AppError(
      `Upload failed${reason ? `: ${reason}` : ''}`,
      ErrorCode.UPLOAD_FAILED,
      500
    );
  }

  static externalService(service: string, reason?: string): AppError {
    const codeMap: Record<string, ErrorCode> = {
      supabase: ErrorCode.SUPABASE_ERROR,
      openai: ErrorCode.OPENAI_ERROR,
      gemini: ErrorCode.GEMINI_ERROR,
      yookassa: ErrorCode.YOOKASSA_ERROR,
    };

    return new AppError(
      `${service} error${reason ? `: ${reason}` : ''}`,
      codeMap[service.toLowerCase()] || ErrorCode.UNKNOWN,
      500
    );
  }

  // Convert to user-friendly message
  toUserMessage(): string {
    switch (this.code) {
      case ErrorCode.INSUFFICIENT_CREDITS:
        return 'Недостаточно токенов для выполнения операции.';
      case ErrorCode.SESSION_EXPIRED:
        return 'Сессия истекла. Начните заново с /start';
      case ErrorCode.SESSION_NOT_FOUND:
        return 'Сессия не найдена. Начните заново с /start';
      case ErrorCode.GENERATION_FAILED:
        return 'Ошибка генерации. Попробуйте ещё раз.';
      case ErrorCode.UPLOAD_FAILED:
        return 'Ошибка загрузки. Попробуйте ещё раз.';
      default:
        return 'Произошла ошибка. Попробуйте ещё раз или обратитесь в поддержку.';
    }
  }
}

// Type guard for AppError
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

// Helper to wrap unknown errors
export function wrapError(error: unknown, defaultMessage = 'Unknown error'): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, ErrorCode.UNKNOWN, 500, true, {
      originalError: error.name,
      stack: error.stack,
    });
  }

  return new AppError(
    typeof error === 'string' ? error : defaultMessage,
    ErrorCode.UNKNOWN,
    500
  );
}
