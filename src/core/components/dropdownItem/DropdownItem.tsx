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
}

const DropdownItem: FC<Props> = ({
  text,
  onSelect,
  onRemove,
  addCheckMark = true,
  exclusiveSelection,
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

  useEffect(() => {
    if (exclusiveSelection?.applied && text != exclusiveSelection.value)
      setSelected(false);
  }, [exclusiveSelection]);
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
