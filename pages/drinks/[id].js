import { useRouter } from "next/router";
import Link from "next/link";

import Head from "next/head";
import Image from "next/image";

import styles from "../../styles/DrinkPage.module.css";

import "chart.js/auto";

import { Pie } from "react-chartjs-2";
import { colorScale } from "../../constants/colors";
import IngredientLabelRow from "../../components/IngredientLabelRow";
import {
  getIngredientsList,
  getPieChartData,
  isPieChartDataEmpty,
} from "../../utils/units";
import { red } from "picocolors";

const pieChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function Drink({ drink = {} }) {
  const renderIngredientLabels = (ingredients) => {
    return ingredients?.map(({ ingredient, measure }, index) => {
      return (
        <>
          {ingredient && measure && (
            <IngredientLabelRow
              label={`${ingredient} (${measure})`}
              color={colorScale[index]}
            />
          )}
        </>
      );
    });
  };

  const ingredientsList = getIngredientsList(drink);

  const pieChartData = getPieChartData(ingredientsList);
  const data = {
    labels: [],
    datasets: [
      {
        data: getPieChartData(ingredientsList),
        backgroundColor: colorScale,
        hoverBackgroundColor: colorScale,
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{drink?.strDrink}</title>
      </Head>
      <Link href="/" passHref>
        <div className={styles.backButton}>
          <h3>{"< Back"}</h3>
        </div>
      </Link>
      <div className={styles.drinkContentContainer}>
        <div className={styles.thumbnailAndNameContainer}>
          <Image
            className={styles.thumbnail}
            src={`${drink?.strDrinkThumb}/preview`}
            width={250}
            height={250}
            alt=""
          />
          <div className={styles.nameContainer}>{drink?.strDrink}</div>
        </div>

        <div className={styles.ingredientsAndChartContainer}>
          <div className={styles.ingredientsContainer}>
            {renderIngredientLabels(ingredientsList)}
          </div>
          <div className={styles.chartContainer}>
            {isPieChartDataEmpty(pieChartData) ? (
              <div className={styles.cannotDisplayChart}>
                Cannot display graph for this drink
              </div>
            ) : (
              <Pie data={data} options={pieChartOptions} />
            )}
          </div>
        </div>
        <div className={styles.instructionsContainer}>
          <p>{drink?.strInstructions}</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  console.log({ params });
  const req = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params.id}`
  );

  console.log({ req });

  if (req) {
    const data = await req.json();

    const { drinks } = data;

    const drink = drinks?.[0];
    return {
      props: { drink },
    };
  }
  return {};
}

// export async function getStaticPaths() {
//   const req = await fetch;
// }
