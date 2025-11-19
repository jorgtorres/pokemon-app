import React, { useEffect } from "react";
import { navigate } from "gatsby";
import User from "../../assets/user.svg";
import Password from "../../assets/password.svg";
import * as styles from "./Login.module.scss";
import { isLoggedIn, setAccessToken } from "../../api/auth";
import TextInput from "../../components/ui/TextInput";
import PokedexLayout from "../../components/ui/PokedexLayout";
import backendService from "../../api/services/backend/backend.service";
import LoginResponse from "../../api/model/backend/LoginResponse";
import { toast } from "react-toastify";

const Login = () => {
  useEffect(() => {
    if (isLoggedIn() && location?.pathname == `/app/login/`) {
      navigate(`/app/pokedex`);
    }
  }, [location?.pathname]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    await backendService.backend
      .login({
        username,
        password,
        grant_type: "password",
      })
      .then((data) => {
        const response = data?.data as LoginResponse;
        setAccessToken(response.access_token ?? "");
        navigate(`/app/pokedex`);
      })
      .catch((error) => {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      });
  };

  return (
    <PokedexLayout>
      <div className={styles.loginContainer}>
        <form
          method="post"
          onSubmit={async (event) => {
            await handleSubmit(event);
          }}
        >
          <div className={styles.formContainer}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <TextInput
              id="username"
              dataTestId="username-input"
              name="username"
              placeholder="Enter a username"
              Icon={User}
            />
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <TextInput
              id="password"
              dataTestId="password-input"
              name="password"
              type="password"
              placeholder="Enter a password"
              Icon={Password}
            />
            <input
              type="submit"
              className={styles.loginButton}
              value="Log In"
            />
          </div>
        </form>
      </div>
    </PokedexLayout>
  );
};

export default Login;
