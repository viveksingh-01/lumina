import { IUserDetails } from "./user-details";

export interface ISuccessResponse {
  success: boolean;
  message: string;
  data: IUserDetails;
}

export interface IErrorResponse {
  error: string;
}

export interface IUserDetailsResponse {
  success: boolean;
  data: IUserDetails;
}
