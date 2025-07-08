declare module 'lodash' {
  export function uniqueId(prefix?: string): string;
  export function isArray(value: any): value is any[];
  export function isObject(value: any): value is object;
  export function isEmpty(value: any): boolean;
  export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: any
  ): T & { cancel(): void; flush(): ReturnType<T> };
  export function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait?: number,
    options?: any
  ): T & { cancel(): void; flush(): ReturnType<T> };
  export function cloneDeep<T>(value: T): T;
  export function merge<T>(object: T, ...sources: any[]): T;
  export function pick<T, K extends keyof T>(object: T, ...props: K[]): Pick<T, K>;
  export function omit<T, K extends keyof T>(object: T, ...props: K[]): Omit<T, K>;
  // Add more lodash functions as needed
  const _: any;
  export default _;
}
