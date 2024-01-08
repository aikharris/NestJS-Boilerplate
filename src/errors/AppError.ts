class AppError extends Error {
  public message!: string;
  public statusCode!: number;
  public errors: { [key: string]: string } | undefined | null;

  constructor(
    message: string,
    statusCode: number,
    errors?: { [key: string]: string },
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default AppError;
