import Head from "next/head";
import PromptLogin from "@/components/promptLogin/PromptLogin";
import { FC, SetStateAction } from "react";
import DogSearch from "@/components/dogSearch/DogSearch";

interface Props {
  authed: boolean;
  handleAuthChange: (
    loginStatus: boolean
  ) => React.Dispatch<SetStateAction<boolean>>;
}

const Home: FC<Props> = ({ authed, handleAuthChange }) => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dog.ico" />
      </Head>
      {authed ? (
        <DogSearch />
      ) : (
        <PromptLogin handleAuthChange={handleAuthChange} />
      )}
    </>
  );
};

export default Home;
