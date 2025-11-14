import type Pokemon from './Pokemon.js';

export default interface SearchResponse {
  results: Array<Pokemon>;
}
