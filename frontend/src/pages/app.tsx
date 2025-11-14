import React, { lazy, Suspense } from "react";
import type { HeadFC } from "gatsby";
import { Router } from "@reach/router";
import Login from "../containers/Login/Login";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  const Pokedex = lazy(() => import("../containers/Pokedex"));
  const PokemonDetails = lazy(() => import("../containers/PokemonDetails"));

  return (
    <main>
      <Layout>
        <Suspense fallback={null}>
          <Router>
            <PrivateRoute path="/app/pokedex" component={Pokedex} />
            <PrivateRoute path="/app/pokedex/:id" component={PokemonDetails} />
            <Login path="/app/login" />
          </Router>
        </Suspense>
      </Layout>
    </main>
  );
};

export default AppRoutes;

export const Head: HeadFC = () => <title>App</title>;
