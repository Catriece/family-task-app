import { ChakraProvider, Grid, GridItem, Heading } from "@chakra-ui/react";
import { inputTheme } from "./themes.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./context/auth/authProvider.tsx";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./components/header/header.tsx";
import { ModalContextProvider } from "./context/modal-context.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalContextProvider>
          <ChakraProvider theme={inputTheme}>
            <Outlet />
          </ChakraProvider>
        </ModalContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
