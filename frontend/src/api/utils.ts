import { getAccessToken } from "./auth";
import { invokeService } from "./services/invokeService";
import ServiceConfig from "./model/invokeServices/serviceConfig";
import type { MutationFunction, UseMutationOptions } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import type { AxiosError } from "axios";

const fetchWithCancellation = async <T>(
  config: Omit<ServiceConfig, "headers">,
  serviceName: string,
  isBasicAuth: boolean = false
): Promise<T> => {
  try {
    const { data } = await invokeService(
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
    return data;
  } catch (err) {
    const axiosErr = err as AxiosError | unknown;
    throw axiosErr;
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

export function useCustomMutation<TData, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, AxiosError<any>, TVariables> & {
    invalidateQueryKeys?: string[][];
    useGenericErrorNotification?: boolean;
  }
) {
  const queryClient = useQueryClient();
  const {
    invalidateQueryKeys = [],
    useGenericErrorNotification = true,
    onSuccess,
    onError,
    ...mutationOptions
  } = options || {};

  return useMutation<TData, AxiosError, TVariables, unknown>(
    async (variables) => mutationFn(variables),
    {
      ...mutationOptions,
      onSuccess: async (data, variables, context) => {
        if (invalidateQueryKeys.length) {
          for (const queryKey of invalidateQueryKeys) {
            await queryClient.invalidateQueries(queryKey);
          }
        }
        onSuccess?.(data, variables, context);
      },
      onError: (err, variables, context) => {
        if (useGenericErrorNotification) {
          console.log("An error occurred:", err);
        }
        onError?.(err, variables, context);
      },
    }
  );
}
