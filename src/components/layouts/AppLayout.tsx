import { FC, ReactNode } from "react";
import NavBar from "../navBar/NavBar";
import styles from "./appLayout.module.scss";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <NavBar />
      <div className={styles.pageContainer}>{children}</div>
    </div>
  );
};

export default AppLayout;
