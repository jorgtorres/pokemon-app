import React, { lazy, Suspense } from "react";
import type { HeadFC } from "gatsby";
import { Router } from "@reach/router";
import Login from "../containers/Login/Login";
import PrivateRoute from "../routes";
import PokemonQueryClientProvider from "../components/react-query/PokemonQueryClientProvider";
import { ToastContainer } from "react-toastify";
import SEO from "../components/seo";

const AppRoutes: React.FC = () => {
  const Pokedex = lazy(() => import("../containers/Pokedex"));
  const PokemonDetails = lazy(() => import("../containers/PokemonDetails"));

  return (
    <main>
      <PokemonQueryClientProvider>
        <Suspense fallback={null}>
          <Router>
            <PrivateRoute path="/app/pokedex" component={Pokedex} />
            <PrivateRoute path="/app/pokedex/:id" component={PokemonDetails} />
            <Login path="/app/login" />
          </Router>
        </Suspense>
      </PokemonQueryClientProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
};

export default AppRoutes;

export const Head: HeadFC = () => <SEO />;
