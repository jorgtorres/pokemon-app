import { LoginRequest } from "../../model/backend/LoginRequest";
import { SearchRequest } from "../../model/backend/SearchRequest";
import buildQueryString from "../../queryString";
import { fetchWithServiceName } from "../../utils";

const fetchBackendServiceBasic = fetchWithServiceName("BackendService", true);
const fetchBackendService = fetchWithServiceName("BackendService", false);

const backend = {
  login: async <T>(loginRequest: LoginRequest) =>
    await fetchBackendServiceBasic<T>({
      method: "POST",
      url: `http://localhost:8008/login`,
      data: loginRequest,
    }),
  searchPokemons: async <T>(searchRequest: SearchRequest) =>
    await fetchBackendService<T>({
      method: "GET",
      url: `http://localhost:8008/pokemons?${buildQueryString({
        searchRequest,
      })}`,
    }),
  getPokemon: async <T>(id: string) =>
    await fetchBackendService<T>({
      method: "GET",
      url: `http://localhost:8008/pokemons/${id}`,
    }),
};

const backendService = {
  backend,
};

export default backendService;
