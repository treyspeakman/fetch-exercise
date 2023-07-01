import { FC } from "react";
import clsx from "clsx";
import styles from "./searchHeader.module.scss";

interface Props {
  children: React.ReactNode;
  renderIcon: () => React.ReactNode;
  className?: string;
}

const SearchHeader: FC<Props> = ({ children, renderIcon, className }) => {
  return (
    <div className={clsx(styles.filterHeader, className)}>
      {renderIcon()}
      <div className={styles.dropdownsContainer}>{children}</div>
    </div>
  );
};

export default SearchHeader;
