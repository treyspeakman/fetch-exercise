import { inspect } from "@xstate/inspect";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { GlobalStateProvider } from "@/lib/contexts/GlobalStateProvider";
import { useState } from "react";

if (typeof window !== "undefined" && process.env.NODE_ENV == "development") {
  inspect({ iframe: false });
}

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AppLayout authed={isLoggedIn}>
      <GlobalStateProvider>
        <Component
          {...pageProps}
          authed={isLoggedIn}
          handleAuthChange={(loginStatus: boolean) =>
            setIsLoggedIn(loginStatus)
          }
        />
      </GlobalStateProvider>
    </AppLayout>
  );
}
