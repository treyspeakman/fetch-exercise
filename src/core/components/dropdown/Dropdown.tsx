import { FC, useState } from "react";
import clsx from "clsx";
import styles from "./dropdown.module.scss";
import DropDownIcon from "public/icons/chevron-down.svg";
import CloseIcon from "public/icons/chevron-up.svg";
import DropdownItem from "../dropdownItem/DropdownItem";

interface Props {
  title: string;
  children: React.ReactNode;
}

const Dropdown: FC<Props> = ({ title, children }) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className={styles.dropdownContainer}>
      <div
        className={clsx(styles.dropdownButton, opened && styles.opened)}
        onClick={() => setOpened(true)}
      >
        {title}
        <DropDownIcon />
      </div>
      <div
        className={clsx(styles.dropdownBodyContainer, !opened && styles.closed)}
      >
        <div className={clsx(styles.dropdownBody, !opened && styles.closed)}>
          <div className={styles.dropdownBodyHeader}>
            {title}
            <CloseIcon
              onClick={() => setOpened(false)}
              className={styles.closeIcon}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
