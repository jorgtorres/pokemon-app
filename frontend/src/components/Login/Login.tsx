import React, { useState } from "react";
import { useBackendLogin } from "../../api/services/backend/hooks/backendHooks";
import { navigate } from "gatsby";
import User from "../../assets/user.svg";
import Password from "../../assets/password.svg";
import * as styles from "./Login.module.scss";

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
    event.stopPropagation();
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
        onSuccess: () => {
          navigate(`/app/profile`);
        },
        onError: (error) => {
          console.log("Login failed:", error.message);
        },
      }
    );
  };

  return (
    <div className={styles.loginContainer}>
      <form
        method="post"
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <div className={styles.formContainer}>
          <label className={styles.label}>Username:</label>
          <div className={styles.searchWrapper}>
            <User className={styles.icon} />
            <input type="text" name="username" onChange={handleUpdate} />
          </div>
          <label className={styles.label}>Password:</label>
          <div className={styles.searchWrapper}>
            <Password className={styles.icon} />
            <input type="password" name="password" onChange={handleUpdate} />
          </div>
          <input type="submit" className={styles.loginButton} value="Log In" />
        </div>
      </form>
    </div>
  );
};

export default Login;
