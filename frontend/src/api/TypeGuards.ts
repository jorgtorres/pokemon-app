export default class TypeGuards {
  /**
   * Type guard to check if a value is neither null nor undefined.
   *
   * @param {T | null | undefined} value - The value to check.
   * @returns {value is T} - True if the value is neither null nor undefined, false otherwise.
   */
  static isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  /**
   * Type guard to check if a value is a string.
   *
   * @param {any} value - The value to check.
   * @returns {value is string} - True if the value is a string, false otherwise.
   */
  static isString(value: any): value is string {
    return typeof value === "string";
  }

  /**
   * Type guard to check if a value is a number.
   *
   * @param {any} value - The value to check.
   * @returns {value is number} - True if the value is a number, false otherwise.
   */
  static isNumber(value: any): value is number {
    return typeof value === "number";
  }

  /**
   * Type guard to check if a value is null.
   *
   * @param {any} value - The value to check.
   * @returns {value is null} - True if the value is null, false otherwise.
   */
  static isNull(value: any): value is null {
    return value === null;
  }

  /**
   * Type guard to check if a value is undefined.
   *
   * @param {any} value - The value to check.
   * @returns {value is undefined} - True if the value is undefined, false otherwise.
   */
  static isUndefined(value: any): value is undefined {
    return value === undefined;
  }

  /**
   * Type guard to check if a value is a boolean.
   *
   * @param {any} value - The value to check.
   * @returns {value is boolean} - True if the value is a boolean, false otherwise.
   */
  static isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
  }

  /**
   * Type guard to check if a value is a non-null object.
   *
   * @param {any} value - The value to check.
   * @returns {value is object} - True if the value is a non-null object, false otherwise.
   */
  static isObject(value: any): value is any {
    return value !== null && typeof value === "object";
  }

  /**
   * Type guard to check if a value is a function.
   *
   * @param {any} value - The value to check.
   * @returns {value is Function} - True if the value is a function, false otherwise.
   */
  static isFunction(value: any): value is Function {
    return typeof value === "function";
  }

  /**
   * Type guard to check if a value is a Date object.
   *
   * @param {any} value - The value to check.
   * @returns {value is Date} - True if the value is a Date object, false otherwise.
   */
  static isDate(value: any): value is Date {
    return value instanceof Date;
  }

  /**
   * Type guard to check if a value is a Promise.
   *
   * @param {any} value - The value to check.
   * @returns {value is Promise<any>} - True if the value is a Promise, false otherwise.
   */
  static isPromise(value: any): value is Promise<any> {
    return (
      this.isObject(value) &&
      this.isFunction(value.then) &&
      this.isFunction(value.catch)
    );
  }
}
