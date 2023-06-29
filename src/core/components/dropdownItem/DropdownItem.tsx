import { FC, useState } from "react";
import clsx from "clsx";
import styles from "./dropdownItem.module.scss";
import CheckIcon from "public/icons/check.svg";

interface Props {
  text: string;
  onSelect: any;
  onRemove?: any;
  addCheckMark?: boolean;
}

const DropdownItem: FC<Props> = ({
  text,
  onSelect,
  onRemove,
  addCheckMark = true,
}) => {
  const [selected, setSelected] = useState<boolean>();

  const handleSelection = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (newSelected) {
      onSelect();
    } else {
      onRemove();
    }
  };
  return (
    <div onClick={() => handleSelection()} className={styles.dropdownItem}>
      {text}

      {addCheckMark && (
        <CheckIcon
          className={clsx(styles.checkIcon, selected && styles.selected)}
        />
      )}
    </div>
  );
};

export default DropdownItem;
