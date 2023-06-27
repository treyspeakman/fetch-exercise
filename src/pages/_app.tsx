import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AppLayout from "@/components/layouts/AppLayout";
import { useEffect, useState } from "react";
import { trpcClient } from "@/lib/utils/trpc/client";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkIfAuthed = async () => {
      setIsLoggedIn(await trpcClient.checkAuthentication.check.query());
    };

    checkIfAuthed();
  }, []);
  return (
    <AppLayout authed={isLoggedIn}>
      <Component
        {...pageProps}
        authed={isLoggedIn}
        onLogin={() => setIsLoggedIn(true)}
      />
    </AppLayout>
  );
}
