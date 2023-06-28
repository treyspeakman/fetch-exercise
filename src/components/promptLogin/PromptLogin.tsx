import Input from "@/core/components/input/Input";
import login from "@/lib/utils/api/login";
import { trpcClient } from "@/lib/utils/trpc/client";
import styles from "./promptLogin.module.scss";
import Button from "@/core/components/button/Button";
import { FC, SetStateAction, useState } from "react";

interface Props {
  handleAuthChange: (
    loginStatus: boolean
  ) => React.Dispatch<SetStateAction<boolean>>;
}

const PromptLogin: FC<Props> = ({ handleAuthChange }) => {
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

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    try {
      const loggedIn = await login({ name, email });
      if (loggedIn) {
        handleAuthChange(true);
      }
    } catch (error) {
      console.error("Failed to login: ", error);
      handleAuthChange(false);
    }
  };

  return (
    <div className={styles.promptLogin}>
      <h5 className={styles.prompt}>
        Discover your perfect pet companion! Log in now to begin your adoption
        journey!
      </h5>
      <form className={styles.form} onSubmit={handleLogin}>
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
