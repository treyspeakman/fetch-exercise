import TextButton from "@/core/components/textButton";
import JakeIcon from "public/icons/jake.svg";
import { useContext } from "react";
import { useActor } from "@xstate/react";
import { GlobalStateContext } from "@/lib/contexts/GlobalStateProvider";

import styles from "./navBar.module.scss";

const NavBar = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.dogSearchService);

  return (
    <div className={styles.navBar}>
      <div className={styles.iconAndTitle}>
        <div className={styles.dogFinderIcon}>
          <JakeIcon className={styles.svgIcon} />
        </div>
        <h6 className={styles.navbarTitle}>Dog Finder</h6>
      </div>
      {state?.context.authed && (
        <div className={styles.signUp}>
          <TextButton
            className={styles.loginLogout}
            onClick={() => send({ type: "LOGOUT" })}
            text="Logout"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
