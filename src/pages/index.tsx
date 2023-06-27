import Head from "next/head";
import PromptLogin from "@/components/promptLogin/PromptLogin";
import { FC } from "react";

interface Props {
  authed: boolean;
  onLogin: () => {};
}

const Home: FC<Props> = ({ authed, onLogin }) => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dog.ico" />
      </Head>
      {authed ? <div>logged in</div> : <PromptLogin onLogin={onLogin} />}
    </>
  );
};

export default Home;
