import React from "react";
import { createRoot } from "react-dom/client"; // Correct import
import App from "./App.jsx";
import "react-datepicker/dist/react-datepicker.css"; // Date picker styles
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store.js";

const queryClient = new QueryClient();

// Use createRoot from react-dom/client
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
