import axios, { AxiosError, AxiosPromise, CancelToken, Canceler } from "axios";
import ServiceConfig from "../model/invokeServices/serviceConfig";
import { removeAccessToken } from "../auth";
import { navigate } from "gatsby";

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
  }).catch((error: AxiosError) => {
    // Catch the error so it's not unhandled, then rethrow so callers can handle it
    if (error.status === 401) {
      removeAccessToken();
      navigate("/");
    }
    throw error as AxiosError;
  }) as AxiosPromiseWithCancel;

  promise.token = source.token;
  promise.cancel = () => {
    source.cancel("Query was cancelled by React Query");
  };
  return promise;
};
