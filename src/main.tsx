import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
