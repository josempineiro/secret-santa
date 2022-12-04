import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full flex flex-col md:max-w-2xl w-full md:mx-auto">
        <Component {...pageProps} />
      </div>
      <div id="modal-root"></div>
    </QueryClientProvider>
  );
}
