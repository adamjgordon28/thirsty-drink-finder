import React from "react";
import styles from "../styles/IngredientLabelRow.module.css";

const IngredientLabelRow = ({ color, label }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.label}
        style={{
          backgroundColor: color,
        }}
      />
      {label}
    </div>
  );
};
export default IngredientLabelRow;
