import React, { useEffect, useRef, useState } from "react";
import useTypedSelector from "../../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import * as styles from "./PagePicker.module.scss";
import { setPaginationCurrentPageLimit } from "../../../redux/reducers/paginationReducer";

interface SortButtonProps {}

const PagePicker = ({ ...rest }: SortButtonProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const {
    pokedexReducer: {
      paginationReducer: {
        paginationValues: { currentPageLimit },
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

  function handleSelect(v: number) {
    dispatch(setPaginationCurrentPageLimit(v));
    setOpen(false);
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        data-testid="page-picker-button"
        onClick={() => setOpen((s) => !s)}
        value="Filter"
        className={styles.button}
        {...rest}
      >
        {currentPageLimit}
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <h4 className={styles.dropdownTitle}>Pokemon Per Page</h4>
          <div className={styles.dropdownInner}>
            <div className={styles.options}>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={currentPageLimit === 20}
                  onChange={() => handleSelect(20)}
                />
                <span className={styles.radioMark} aria-hidden />
                <span className={styles.optionLabel}>20</span>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={currentPageLimit === 50}
                  onChange={() => handleSelect(50)}
                />
                <span className={styles.radioMark} aria-hidden />
                <span className={styles.optionLabel}>50</span>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={currentPageLimit === 100}
                  onChange={() => handleSelect(100)}
                />
                <span className={styles.radioMark} aria-hidden />
                <span
                  data-testid="page-picker-option-100"
                  className={styles.optionLabel}
                >
                  100
                </span>
              </label>
              <label className={styles.option}>
                <input
                  type="radio"
                  name="sort"
                  checked={currentPageLimit === 500}
                  onChange={() => handleSelect(500)}
                />
                <span className={styles.radioMark} aria-hidden />
                <span className={styles.optionLabel}>500</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagePicker;
