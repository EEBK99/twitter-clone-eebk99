/**
 * error handler
 * @param status
 * @param message
 */
export const handleError = (status: string, message: string) => {
  const error = new Error();
  error.name = status;
  error.message = message;
  return error;
};
