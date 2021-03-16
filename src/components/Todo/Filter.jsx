import React from "react";
import styles from "./styles.module.css";

export function Filter({ completedFilter, setCompletedFilter, listId}) {
  const toggleCompletedFilter = (value) => {
    setCompletedFilter(value);
  };

  return (
    <div className={styles["filter-wrapper"]}>
      <input
        id={`${listId}-radioBtn1`}
        className={styles["radio-button"]}
        type="radio"
        name="completedFilter"
        onChange={(event) => toggleCompletedFilter(null)}
        checked={completedFilter === null}
      />
      <label for={`${listId}-radioBtn1`} className={styles["label-filter"]}>
        All
      </label>
      <input
        id={`${listId}-radioBtn2`}
        className={styles["radio-button"]}
        type="radio"
        name="completedFilter"
        onChange={(event) => toggleCompletedFilter(true)}
      />
      <label for={`${listId}-radioBtn2`} className={styles["label-filter"]}>
        Completeted
      </label>
      <input
        id={`${listId}-radioBtn3`}
        className={styles["radio-button"]}
        type="radio"
        name="completedFilter"
        onChange={(event) => toggleCompletedFilter(false)}
      />
      <label for={`${listId}-radioBtn3`} className={styles["label-filter"]}>
        Not Completed
      </label>
    </div>
  );
}