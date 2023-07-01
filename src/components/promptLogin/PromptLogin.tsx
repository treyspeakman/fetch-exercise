import styles from "./promptLogin.module.scss";
import Button from "@/core/components/button/Button";
import { useState } from "react";
import { useContext } from "react";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";
import { useActor } from "@xstate/react";

const PromptLogin = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitting credentials");
    send({ type: "LOGIN", credentials: { name, email } });
  };

  return (
    <div className={styles.promptLogin}>
      <h5 className={styles.prompt}>
        Discover your perfect pet companion! Log in now to begin your adoption
        journey!
      </h5>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
