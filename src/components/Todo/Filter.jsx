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
        name={`${listId}-completedFilter`}
        onChange={(event) => toggleCompletedFilter(null)}
        defaultChecked={true}
        value={completedFilter === null}
      />
      <label htmlFor={`${listId}-radioBtn1`} className={styles["label-filter"]}>
        All
      </label>
      <input
        id={`${listId}-radioBtn2`}
        className={styles["radio-button"]}
        type="radio"
        name={`${listId}-completedFilter`}
        onChange={(event) => toggleCompletedFilter(true)}
        value={completedFilter === true}
      />
      <label htmlFor={`${listId}-radioBtn2`} className={styles["label-filter"]}>
        Completeted
      </label>
      <input
        id={`${listId}-radioBtn3`}
        className={styles["radio-button"]}
        type="radio"
        name={`${listId}-completedFilter`}
        onChange={(event) => toggleCompletedFilter(false)}
        value={completedFilter === false}
      />
      <label htmlFor={`${listId}-radioBtn3`} className={styles["label-filter"]}>
        Not Completed
      </label>
    </div>
  );
}