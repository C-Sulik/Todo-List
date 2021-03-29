import React from "react";
import styles from "./styles.module.css";
import { CompletedFilterState } from "./List";

interface FilterPropsI {
  listId: number;
  setCompletedFilter: (value: CompletedFilterState) => void;
}

export const Filter: React.FC<FilterPropsI> = ({
  listId,
  setCompletedFilter,
}) => {
  const toggleCompletedFilter = (value: CompletedFilterState) => {
    setCompletedFilter(value);
  };

  return (
    <div className={styles["filter-wrapper"]}>
      <input
        id={`${listId}-radioBtn1`}
        className={styles["radio-button"]}
        type="radio"
        name={`${listId}-completedFilter`}
        onChange={(event) => toggleCompletedFilter("all")}
        defaultChecked={true}
        value="all"
      />
      <label htmlFor={`${listId}-radioBtn1`} className={styles["label-filter"]}>
        All
      </label>
      <input
        id={`${listId}-radioBtn2`}
        className={styles["radio-button"]}
        type="radio"
        name={`${listId}-completedFilter`}
        onChange={(event) => toggleCompletedFilter("completed")}
        value="completed"
      />
      <label htmlFor={`${listId}-radioBtn2`} className={styles["label-filter"]}>
        Completeted
      </label>
      <input
        id={`${listId}-radioBtn3`}
        className={styles["radio-button"]}
        type="radio"
        name={`${listId}-completedFilter`}
        onChange={(event) => toggleCompletedFilter("not completed")}
        value="not completed"
      />
      <label htmlFor={`${listId}-radioBtn3`} className={styles["label-filter"]}>
        Not Completed
      </label>
    </div>
  );
};
