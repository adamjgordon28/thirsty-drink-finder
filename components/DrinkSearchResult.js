import React from "react";
import Link from "next/link";

const DrinkSearchResult = ({ drink }) => {
  return (
    <Link href={`/drinks/${drink?.strDrink}`} passHref>
      <div
        style={{
          height: 40,
          padding: 2,
          backgroundColor: "#173f5f",
          color: "#ffffff",
          fontSize: 24,
          boxShadow: "5px 5px 5px #173f5f",
          marginTop: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: "12px",
        }}
      >
        {drink?.strDrink}
      </div>
    </Link>
  );
};

export default DrinkSearchResult;
