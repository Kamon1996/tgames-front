/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */

type FetchBaseQueryError = {
  status: number;
  originalStatus: number;
  data: string;
  error: string;
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof (error as any).data === "string"
  );
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
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
