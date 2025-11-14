import React, { useEffect, useRef, useState } from "react";
import * as styles from "./FilterButton.module.scss";
import Sort from "../../assets/sort.svg";

interface FilterButtonProps {
  onChange?: (value: "number" | "name") => void;
}

const FilterButton = ({ onChange, ...rest }: FilterButtonProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<"number" | "name">("number");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function handleSelect(v: "number" | "name") {
    setValue(v);
    onChange?.(v);
    setOpen(false);
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        value="Filter"
        className={styles.circleButton}
        {...rest}
      >
        <Sort className={styles.icon} />
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <div className={styles.dropdownInner}>
            <h4 className={styles.dropdownTitle}>Sort by:</h4>
            <div className={styles.options}>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={value === "number"}
                  onChange={() => handleSelect("number")}
                />
                <span className={styles.radioMark} aria-hidden />
                <span className={styles.optionLabel}>Number</span>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={value === "name"}
                  onChange={() => handleSelect("name")}
                />
                <span className={styles.radioMark} aria-hidden />
                <span className={styles.optionLabel}>Name</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
