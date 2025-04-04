declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

declare type PaginatedResponse<T> = {
  pagination: Metadata;
} & T;
