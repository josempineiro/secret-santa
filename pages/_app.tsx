import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import ModeSwitcher from "components/ModeSwitcher";
import "styles/globals.css";
import AppProvider from "context/AppContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="h-full flex flex-col md:max-w-2xl w-full md:mx-auto">
          <div className="fixed top-6 right-6">
            <ModeSwitcher />
          </div>
          <Component {...pageProps} />
        </div>
        <div id="modal-root"></div>
      </AppProvider>
    </QueryClientProvider>
  );
}
