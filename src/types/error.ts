export type CustomErrorType = Error & {
  status?: number;
  err_code?: string;
};
