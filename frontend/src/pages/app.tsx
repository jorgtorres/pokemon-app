import * as React from "react";
import type { HeadFC } from "gatsby";
import { Router } from "@reach/router";
import Layout from "../components/Layout";
import Login from "../components/Login/Login";

const AppRoutes: React.FC = () => {
  return (
    <main>
      <Layout>
        <Router>
          <Login path="/app/login" />
        </Router>
      </Layout>
    </main>
  );
};

export default AppRoutes;

export const Head: HeadFC = () => <title>App</title>;
