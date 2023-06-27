import TextButton from "@/core/components/textButton";
import Button from "@/core/components/button";
import JakeIcon from "public/icons/jake-white.svg";

import styles from "./navBar.module.scss";

type props = {
  authed?: boolean;
};

const NavBar: React.FC<props> = ({ authed }: props) => {
  // const { data: session, status } = useSession();
  return (
    <div className={styles.navBar}>
      <div className={styles.iconAndTitle}>
        <div className={styles.tripBrainyIcon}>
          <JakeIcon className={styles.svgIcon} />
        </div>
        <h6 className={styles.navbarTitle}>Dog Finder</h6>
        <span className={styles.version}>v1.0.0</span>
      </div>
      {authed && (
        <div className={styles.signUp}>
          <TextButton
            className={styles.loginLogout}
            onClick={() => {}}
            text="Logout"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
