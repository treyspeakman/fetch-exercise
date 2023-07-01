import { FC, useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./dropdownItem.module.scss";
import CheckIcon from "public/icons/check.svg";
import capitalizeFirstLetter from "@/lib/utils/helpers/capitalizeFirstLetter";

interface ExclusiveSelection {
  applied: true;
  value: any;
}

interface Props {
  text: string;
  onSelect: any;
  onRemove?: any;
  addCheckMark?: boolean;
  exclusiveSelection?: ExclusiveSelection;
  initialSelected?: boolean;
}

const DropdownItem: FC<Props> = ({
  text,
  onSelect,
  onRemove,
  addCheckMark = true,
  initialSelected,
}) => {
  const [selected, setSelected] = useState<boolean>(initialSelected || false);

  const handleSelection = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (newSelected) {
      onSelect();
    } else {
      onRemove();
    }
  };

  useEffect(() => {
    if (initialSelected !== undefined) setSelected(initialSelected);
  }, [initialSelected]);

  return (
    <div onClick={() => handleSelection()} className={styles.dropdownItem}>
      {capitalizeFirstLetter(text)}

      {addCheckMark && (
        <CheckIcon
          className={clsx(styles.checkIcon, selected && styles.selected)}
        />
      )}
    </div>
  );
};

export default DropdownItem;
