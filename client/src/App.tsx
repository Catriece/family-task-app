import { ChakraProvider, Grid, GridItem, Heading } from "@chakra-ui/react";
import { inputTheme } from "./themes.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./auth/authProvider.tsx";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={inputTheme}>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
export default App;
