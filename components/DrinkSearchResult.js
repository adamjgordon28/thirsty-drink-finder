import React from "react";
import Link from "next/link";
import styles from "../styles/DrinkSearchResult.module.css";

const DrinkSearchResult = ({ drink }) => {
  return (
    <Link href={`/drinks/${drink?.strDrink}`} passHref>
      <div className={styles.result}>{drink?.strDrink}</div>
    </Link>
  );
};

export default DrinkSearchResult;
