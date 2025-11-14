import { LoginRequest } from "../../model/backend/LoginRequest";
import { fetchWithServiceName } from "../../utils";

const fetchBackendService = fetchWithServiceName("BackendService", true);

const backend = {
  login: async <T>(loginRequest: LoginRequest) =>
    await fetchBackendService<T>({
      method: "POST",
      url: `http://localhost:8008/login`,
      data: loginRequest,
    }),
};

const backendService = {
  backend,
};

export default backendService;
