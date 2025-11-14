import { getAccessToken, removeAccessToken } from "./auth";
import { invokeService } from "./services/invokeService";
import ServiceConfig from "./model/invokeServices/serviceConfig";
import type { QueryKey, UseQueryOptions } from "react-query";
import { useQuery } from "react-query";
import type { AxiosError } from "axios";

const fetchWithCancellation = async <T>(
  config: Omit<ServiceConfig, "headers">,
  serviceName: string,
  isBasicAuth: boolean = false
): Promise<T> => {
  try {
    const response = await invokeService(
      {
        ...config,
        headers: {
          Authorization: isBasicAuth
            ? "Basic " + "Y2xpZW50SWQ6Y2xpZW50U2VjcmV0"
            : "Bearer " + (getAccessToken() || ""),
          "Content-Type": "application/json",
        },
      },
      serviceName
    );
    return response?.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchWithServiceName = (
  serviceName: string,
  isBasicAuth: boolean = false
) => {
  return async <T>(config: Omit<ServiceConfig, "headers">): Promise<T> => {
    return fetchWithCancellation<T>(config, serviceName, isBasicAuth);
  };
};

export const useCustomQuery = <T>(
  key: Array<string>,
  queryFn: (...args: any) => Promise<T>,
  options?: UseQueryOptions<T, AxiosError>
) => {
  return useQuery<T, AxiosError>(key, queryFn, options);
};

export type UseCustomQueryOptions<T> = UseQueryOptions<
  T,
  AxiosError<any>,
  T,
  QueryKey
>;
