import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./context/auth/authProvider.tsx";
import { Outlet } from "react-router-dom";
import { ModalContextProvider } from "./context/modal/modal-context.tsx";
import { TaskContextProvider } from "./context/tasks/task-context.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalContextProvider>
          <TaskContextProvider>
            <ChakraProvider theme={theme}>
              <Outlet />
            </ChakraProvider>
          </TaskContextProvider>
        </ModalContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;
