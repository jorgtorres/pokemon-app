import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../Login";
import Layout from "../../../components/ui/PokedexLayout";

const setup = () => {
  return render(
    <Layout>
      <Login path="/" />
    </Layout>
  );
};

afterEach(cleanup);

describe("LoginPage", () => {
  it("renders email and password form fields", () => {
    setup();
    const emailInput = screen.getByPlaceholderText("Enter a username");
    expect(emailInput).toBeVisible();
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeEnabled();

    const passwordInput = screen.getByPlaceholderText("Enter a password");
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toBeEnabled();
  });

  it("renders log in button", () => {
    setup();
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeVisible();
    expect(loginButton).toBeEnabled();
  });
});
