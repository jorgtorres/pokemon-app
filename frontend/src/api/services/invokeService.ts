import axios, { AxiosError, AxiosPromise, CancelToken, Canceler } from "axios";
import ServiceConfig from "../model/invokeServices/serviceConfig";

interface AxiosPromiseWithCancel extends AxiosPromise<any> {
  token?: CancelToken;
  cancel?: Canceler;
}

export const invokeService = (
  serviceConfig: ServiceConfig,
  serviceName: string
): AxiosPromiseWithCancel => {
  const source = axios.CancelToken.source();
  const promise: AxiosPromiseWithCancel = axios({
    ...serviceConfig,
    cancelToken: source.token,
  }).catch((error) => {
    // Catch the error so it's not unhandled, then rethrow so callers can handle it
    throw error as AxiosError;
  }) as AxiosPromiseWithCancel;

  promise.token = source.token;
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };
  return promise;
};
