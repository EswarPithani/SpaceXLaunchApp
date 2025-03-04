import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "../src/navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Ensure only valid React components inside */}
      <AppNavigator />
    </QueryClientProvider>
  );
}
