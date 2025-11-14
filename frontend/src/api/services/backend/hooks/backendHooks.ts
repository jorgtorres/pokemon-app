import LoginResponse from "../../../model/backend/LoginResponse";
import Pokemon from "../../../model/backend/Pokemon";
import { SearchResponse } from "../../../model/backend/SearchResponse";
import {
  useCustomMutation,
  useCustomQuery,
  UseCustomQueryOptions,
} from "../../../utils";
import backendService from "../backend.service";

export const useBackendLogin = () => {
  return useCustomMutation<
    LoginResponse,
    Parameters<typeof backendService.backend.login>[0]
  >(async (loginData) => await backendService.backend.login(loginData), {
    mutationKey: "POST_LOGIN",
    useGenericErrorNotification: true,
    onSuccess: () => {
      console.log("Login successful");
    },
  });
};

export const useBackendSearchPokemons = <T extends SearchResponse<Pokemon[]>>(
  { limit }: Parameters<typeof backendService.backend.searchPokemons>[0],
  options?: UseCustomQueryOptions<T>
) => {
  return useCustomQuery<T>(
    ["POKEMON"],
    async () =>
      await backendService.backend.searchPokemons({
        limit,
      }),
    options
  );
};

export const useBackendGetPokemon = <T extends Pokemon>(
  id: Parameters<typeof backendService.backend.getPokemon>[0],
  options?: UseCustomQueryOptions<T>
) => {
  return useCustomQuery<T>(
    ["POKEMON", id],
    async () => await backendService.backend.getPokemon(id),
    options
  );
};
