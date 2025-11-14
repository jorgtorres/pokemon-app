import React from "react";
import * as styles from "./layout.module.scss";
import { QueryClient, QueryClientProvider } from "react-query";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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
    <QueryClientProvider client={queryClient}>
      <div className={styles.contentContainer}>{children}</div>
    </QueryClientProvider>
  );
};

export default Layout;
