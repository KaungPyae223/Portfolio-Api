import { CustomErrorType } from "../types/error";

export const createError = (
  message: string,
  status: number,
  errorCode: string
) => {
  const error: CustomErrorType = new Error(message);
  error.status = status;
  error.err_code = errorCode;
  return error;
};
