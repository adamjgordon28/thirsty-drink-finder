import React from "react";

const IngredientLabelRow = ({ color, label, measure }) => {
  console.log({ color });
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: 16,
          height: 16,
          minWidth: 16,
          minHeight: 16,
          border: "2px solid black",
          backgroundColor: color,
          marginRight: 4,
        }}
      />
      {label}
      {measure}
    </div>
  );
};
export default IngredientLabelRow;
