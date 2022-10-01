type FetchBaseQueryError = {
  status: number;
  data: any;
};

type dataWithTitleAndMessage = {
  title: string;
  message: string | string[];
};

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof (error as any).data === "object" &&
    (error as any).data != null
  );
}

export function isDataWithTitleAndMessage(
  data: any
): data is dataWithTitleAndMessage {
  return (
    typeof data === "object" &&
    data != null &&
    "title" in data &&
    typeof (data as any).title === "string" &&
    "message" in data &&
    (typeof (data as any).message === "string" ||
      (Array.isArray((data as any).message) &&
        (data as any).message.every((msg: any) => typeof msg === "string")))
  );
}
