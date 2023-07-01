import { FC, useState } from "react";
import capitalizeFirstLetter from "@/lib/utils/helpers/capitalizeFirstLetter";
import clsx from "clsx";
import styles from "./dropdown.module.scss";
import DropDownIcon from "public/icons/chevron-down.svg";
import CloseIcon from "public/icons/chevron-up.svg";

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
        {capitalizeFirstLetter(title)}
        <DropDownIcon />
      </div>
      <div
        className={clsx(styles.dropdownBodyContainer, !opened && styles.closed)}
      >
        <div
          onMouseLeave={() => setOpened(false)}
          className={clsx(styles.dropdownBody, !opened && styles.closed)}
        >
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
