import React, { useState } from "react";
import { useBackendLogin } from "../../api/services/backend/hooks/backendHooks";
import { navigate } from "gatsby";
import User from "../../assets/user.svg";
import Password from "../../assets/password.svg";
import * as styles from "./Login.module.scss";
import { setAccessToken } from "../../api/auth";
import TextInput from "../../components/TextInput";
import Pokeball from "../../assets/pokeball.svg";

interface LoginProps {
  path?: string;
}

const Login = ({ path }: LoginProps) => {
  const backendLogin = useBackendLogin();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else {
      setUsername(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    await backendLogin.mutateAsync(
      {
        username,
        password,
        grant_type: "password",
      },
      {
        onSuccess: (data) => {
          setAccessToken(data.access_token ?? "");
          navigate(`/app/pokedex`);
        },
        onError: (error) => {
          console.log("Login failed:", error.message);
        },
      }
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.titleContainer}>
        <Pokeball className={styles.svg} />
        <h1 className={styles.headline}>Pokédex</h1>
      </div>
      <div className={styles.loginContainer}>
        <form
          method="post"
          onSubmit={async (event) => {
            await handleSubmit(event);
          }}
        >
          <div className={styles.formContainer}>
            <label className={styles.label}>Username:</label>
            <TextInput
              name="username"
              placeholder="Enter a username"
              handleUpdate={handleUpdate}
              Icon={User}
            />
            <label className={styles.label}>Password:</label>
            <TextInput
              name="password"
              placeholder="Enter a password"
              handleUpdate={handleUpdate}
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
    </div>
  );
};

export default Login;
