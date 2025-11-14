import axios from "axios";
import { LoginRequest } from "../../model/backend/LoginRequest";
import { SearchRequest } from "../../model/backend/SearchRequest";
import buildQueryString from "../../queryString";
import { fetchWithServiceName } from "../../utils";

const fetchBackendService = fetchWithServiceName("BackendService", false);
const backendBaseUrl = "http://localhost:8008";

const backend = {
  login: async <T>(loginRequest: LoginRequest) =>
    await axios({
      method: "POST",
      url: `${backendBaseUrl}/login`,
      data: loginRequest,
      headers: {
        Authorization: "Basic Y2xpZW50SWQ6Y2xpZW50U2VjcmV0",
        "Content-Type": "application/json",
      },
    }),
  searchPokemons: async <T>(searchRequest: SearchRequest) =>
    await fetchBackendService<T>({
      method: "GET",
      url: `${backendBaseUrl}/pokemons?${buildQueryString(searchRequest)}`,
    }),
  getPokemon: async <T>(id: string) =>
    await fetchBackendService<T>({
      method: "GET",
      url: `${backendBaseUrl}/pokemons/${id}`,
    }),
  getPokemonSpecies: async <T>(id: number) =>
    await fetchBackendService<T>({
      method: "GET",
      url: `${backendBaseUrl}/pokemons/pokemon-species/${id}`,
    }),
};

const backendService = {
  backend,
};

export default backendService;
