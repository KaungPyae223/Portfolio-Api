import { CustomErrorType } from "../types/error";
import { errorCode } from "../config/errorCode";

export const validationError = (errors: any) => {
  if (errors.length) {
    const error: CustomErrorType = new Error(errors[0].msg);
    error.status = 400;
    error.err_code = errorCode.validationFailed;
    throw error;
  }
};