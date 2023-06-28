import { FC } from "react";
import styles from "./filterPill.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import CheckIcon from "public/icons/check.svg";
import XIcon from "public/icons/x.svg";
import clsx from "clsx";

type Props = {
  text: string;
  initialChecked: boolean;
  handleClick?: (filter: string) => void;
  className?: string;
};

const FilterPill: FC<Props> = ({
  text,
  initialChecked,
  handleClick,
  className,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={clsx(
          styles.filterPill,
          initialChecked && styles.checked,
          className
        )}
        onClick={() => (handleClick ? handleClick(text) : null)}
      >
        <AnimatePresence>
          {initialChecked && (
            <motion.div
              layout="size"
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: "min-content",
                transition: { duration: 0.05 },
              }}
              exit={{
                visibility: "hidden",
                width: 0,
                transition: { duration: 0.05 },
              }}
            >
              {initialChecked && <CheckIcon className={styles.icon} />}
            </motion.div>
          )}
        </AnimatePresence>
        {text}
      </motion.div>
    </AnimatePresence>
  );
};

export default FilterPill;
