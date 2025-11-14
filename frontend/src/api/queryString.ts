import TypeGuards from "./TypeGuards";

/**
 * Builds a query string from an object containing key-value pairs
 * @param {Record<string, any> | URLPagination} queryParams - Object containing key-value pairs to be included in the query string
 * @returns {string} - The built query string
 */
export default function buildQueryString(queryParams: Record<string, any>) {
  let queryString = "";
  const keys = new Set();
  if (queryParams) {
    queryString = Object.entries(queryParams)
      // filter out empty arrays and undefined/null values
      .filter(([, value]) => {
        if (Array.isArray(value) || TypeGuards.isString(value)) {
          return value.length !== 0;
        }
        return value !== undefined && value !== null && value !== 0;
      })
      .map(([key, value]) => {
        // handle arrays of values
        if (Array.isArray(value) && value.length === 2) {
          return `${key}=${value.join(",")}`;
        }
        if (!keys.has(key)) {
          keys.add(key);
          if (key === "page") return `${key}=${value - 1}`;
          return `${key}=${value}`;
        }
        return null;
      })
      // filter out null values
      .filter(Boolean)
      .join("&");
  }
  return queryString;
}
