export const baseUrl = "http://80.90.187.52/api";
export const defHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}
