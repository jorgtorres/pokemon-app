import LoginResponse from "../../../model/backend/LoginResponse";
import { useCustomMutation } from "../../../utils";
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
