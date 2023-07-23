import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "cropperjs/dist/cropper.css";

// React Context Provider
import { SoftUIControllerProvider, AuthContextProvider } from "context";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SoftUIControllerProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </SoftUIControllerProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
