
declare type SuccessResponse<T> = {
    message: string;
    user:T;
   
}

declare type ErrorResponse = {
    message: string;
    code: number;
}

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse