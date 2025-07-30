export interface ISuccessResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
  };
}

export interface IErrorResponse {
  error: string;
}
