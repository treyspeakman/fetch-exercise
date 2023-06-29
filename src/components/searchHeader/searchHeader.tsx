import { FC } from "react";
import styles from "./searchHeader.module.scss";

interface Props {
  children: React.ReactNode;
  renderIcon: () => React.ReactNode;
}

const SearchHeader: FC<Props> = ({ children, renderIcon }) => {
  return (
    <div className={styles.filterHeader}>
      {renderIcon()}
      <div className={styles.dropdownsContainer}>{children}</div>
    </div>
  );
};

export default SearchHeader;
