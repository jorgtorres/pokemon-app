import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const PokemonQueryClientProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 5,
        staleTime: 0,
        // query options
      },
      mutations: {
        // mutation options
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default PokemonQueryClientProvider;
