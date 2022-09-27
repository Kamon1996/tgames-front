type FetchBaseQueryError = {
  status: number;
  data: string | string[];
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    (typeof (error as any).data === "string" ||
      typeof (error as any).data === "object")
  );
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}
