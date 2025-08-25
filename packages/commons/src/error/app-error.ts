export class AppError extends Error {
  explanation: string;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.explanation = message;
  }
}
