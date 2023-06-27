import { FC, ReactNode } from "react";
import NavBar from "../navBar/NavBar";
import styles from "./appLayout.module.scss";

type AppLayoutProps = {
  children: ReactNode;
  authed: boolean;
};

const AppLayout: FC<AppLayoutProps> = ({ children, authed }) => {
  return (
    <div className={styles.appLayout}>
      <NavBar authed={authed} />
      <div className={styles.pageContainer}>{children}</div>
    </div>
  );
};

export default AppLayout;
