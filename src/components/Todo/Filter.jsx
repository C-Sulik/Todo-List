import React from "react";
import styles from "./styles.module.css";

export function Filter({ completedFilter, setCompletedFilter }) {
  const toggleCompletedFilter = (value) => {
    setCompletedFilter(value);
  };

  return (
    <div className={styles["filter-wrapper"]}>
      <input
        id="radioBtn1"
        className={styles["radio-button"]}
        type="radio"
        name="completedFilter"
        onChange={(event) => toggleCompletedFilter(null)}
        checked={completedFilter === null}
      />
      <label for="radioBtn1" className={styles["label-filter"]}>
        All
      </label>
      <input
        id="radioBtn2"
        className={styles["radio-button"]}
        type="radio"
        name="completedFilter"
        onChange={(event) => toggleCompletedFilter(true)}
      />
      <label for="radioBtn2" className={styles["label-filter"]}>
        Completeted
      </label>
      <input
        id="radioBtn3"
        className={styles["radio-button"]}
        type="radio"
        name="completedFilter"
        onChange={(event) => toggleCompletedFilter(false)}
      />
      <label for="radioBtn3" className={styles["label-filter"]}>
        Not Completed
      </label>
    </div>
  );
}