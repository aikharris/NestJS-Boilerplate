export {};

declare global {
  // add global utils methods
  interface Array<T> {
    removeLast(): T[];
  }
}