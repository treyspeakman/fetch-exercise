import { inspect } from "@xstate/inspect";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { GlobalStateProvider } from "@/lib/contexts/GlobalStateProvider";

if (typeof window !== "undefined" && process.env.NODE_ENV == "development") {
  inspect({ iframe: false });
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </GlobalStateProvider>
  );
}
