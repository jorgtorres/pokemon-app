import React, { useEffect, useRef, useState } from "react";
import * as styles from "./SortButton.module.scss";
import SortPlaceholderIcon from "../../../assets/sortByName.svg";
import SortByNumber from "../../../assets/tag.svg";
import SortByText from "../../../assets/text_format.svg";
import useTypedSelector from "../../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import { setSortValue } from "../../../redux/reducers/filterPageReducer";

export type SortType = "number" | "name" | "";

interface SortButtonProps {}

const SortButton = ({ ...rest }: SortButtonProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const {
    pokedexReducer: {
      filterPageReducer: {
        filterPageValues: { sortValue },
      },
    },
  } = useTypedSelector();

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
    dispatch(setSortValue(v));
    setOpen(false);
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        data-testid="sort-button"
        onClick={() => setOpen((s) => !s)}
        value="Filter"
        className={styles.circleButton}
        {...rest}
      >
        {sortValue === "" && <SortPlaceholderIcon className={styles.icon} />}
        {sortValue === "name" && <SortByText className={styles.icon} />}
        {sortValue === "number" && <SortByNumber className={styles.icon} />}
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <h4 className={styles.dropdownTitle}>Sort by:</h4>
          <div className={styles.dropdownInner}>
            <div className={styles.options}>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={sortValue === "number"}
                  onChange={() => handleSelect("number")}
                />
                <span className={styles.radioMark} aria-hidden />
                <span
                  data-testid="sort-option-number"
                  className={styles.optionLabel}
                >
                  Number
                </span>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={sortValue === "name"}
                  onChange={() => handleSelect("name")}
                />
                <span className={styles.radioMark} aria-hidden />
                <span
                  data-testid="sort-option-name"
                  className={styles.optionLabel}
                >
                  Name
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
