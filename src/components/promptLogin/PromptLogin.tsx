import Input from "@/core/components/input/Input";
import { trpcClient } from "@/lib/utils/trpc/client";
import styles from "./promptLogin.module.scss";
import Button from "@/core/components/button/Button";
import { FC, useState } from "react";

interface Props {
  onLogin: () => {};
}

const PromptLogin: FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  const login = async (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const loggedIn = await trpcClient.login.login.mutate({ name, email });
    if (loggedIn) {
      console.log("setting auth to true");
      onLogin();
    } else {
      console.log("not setting authed to true");
    }
  };

  return (
    <div className={styles.promptLogin}>
      <h5 className={styles.prompt}>
        Discover your perfect pet companion! Log in now to begin your adoption
        journey!
      </h5>
      <form className={styles.form} onSubmit={login}>
        <div>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            className={styles.input}
            placeholder="John Doe"
            id="name"
            value={name}
            onChange={handleNameInputChange}
          ></input>
        </div>
        <div>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="johndoe@example.com"
            id="email"
            value={email}
            onChange={handleEmailInputChange}
          ></input>
        </div>
        <Button type="submit" text="Login"></Button>
      </form>
    </div>
  );
};

export default PromptLogin;
