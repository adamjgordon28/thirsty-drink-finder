import { useRouter } from "next/router";
import Link from "next/link";

import Head from "next/head";
import Image from "next/image";

import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { colorScale } from "../../constants/colors";
import IngredientLabelRow from "../../components/IngredientLabelRow";
import {
  getNumericalOunceAmountFromMeasure,
  getPieChartData,
  isPieChartDataEmpty,
} from "../../utils/units";

const pieChartOptions = {
  plugins: {
    legend: {
      display: false,
      position: "left",
      labels: {
        color: "rgb(255, 99, 132)",
        boxWidth: 16,
        boxHeight: 16,
        marginRight: 40,
        font: {
          size: 16,
        },
      },
    },
  },
};

export default function Drink({ drink = {} }) {
  console.log({ drink });

  const ingredientsList = [
    {
      ingredient: drink?.strIngredient1?.trim(),
      measure: drink?.strMeasure1?.trim(),
    },
    {
      ingredient: drink?.strIngredient2?.trim(),
      measure: drink?.strMeasure2?.trim(),
    },
    {
      ingredient: drink?.strIngredient3?.trim(),
      measure: drink?.strMeasure3?.trim(),
    },
    {
      ingredient: drink?.strIngredient4?.trim(),
      measure: drink?.strMeasure4?.trim(),
    },
    {
      ingredient: drink?.strIngredient5?.trim(),
      measure: drink?.strMeasure5?.trim(),
    },
    {
      ingredient: drink?.strIngredient6?.trim(),
      measure: drink?.strMeasure6?.trim(),
    },
    {
      ingredient: drink?.strIngredient7?.trim(),
      measure: drink?.strMeasure7?.trim(),
    },
    {
      ingredient: drink?.strIngredient8?.trim(),
      measure: drink?.strMeasure8?.trim(),
    },
    {
      ingredient: drink?.strIngredient9?.trim(),
      measure: drink?.strMeasure9?.trim(),
    },
    {
      ingredient: drink?.strIngredient10?.trim(),
      measure: drink?.strMeasure10?.trim(),
    },
    {
      ingredient: drink?.strIngredient11?.trim(),
      measure: drink?.strMeasure11?.trim(),
    },
    {
      ingredient: drink?.strIngredient12?.trim(),
      measure: drink?.strMeasure12?.trim(),
    },
    {
      ingredient: drink?.strIngredient13?.trim(),
      measure: drink?.strMeasure13?.trim(),
    },
    {
      ingredient: drink?.strIngredient14?.trim(),
      measure: drink?.strMeasure14?.trim(),
    },
    {
      ingredient: drink?.strIngredient15?.trim(),
      measure: drink?.strMeasure15?.trim(),
    },
  ];

  const renderIngredientLabels = (ingredients) => {
    return ingredients?.map(({ ingredient, measure }, index) => {
      console.log({ colorScale });
      console.log({ index });
      console.log("AT", colorScale[index]);
      return (
        <>
          {ingredient && measure && (
            <IngredientLabelRow
              label={`${ingredient} (${measure})`}
              color={colorScale[index]}
              measure={getNumericalOunceAmountFromMeasure(measure)}
            />
          )}
        </>
      );
    });
  };

  console.log("PIECHART", getPieChartData(ingredientsList));
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
        <div style={{ cursor: "pointer" }}>
          <h3>{"<-- Back"}</h3>
        </div>
      </Link>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            className="thumbnail"
            src={`${drink?.strDrinkThumb}/preview`}
            width={250}
            height={250}
            alt=""
          />
          <div style={{ fontSize: 20, marginTop: 20, marginBottom: 20 }}>
            {drink?.strDrink}
          </div>
        </div>

        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "50%" }}>
            {renderIngredientLabels(ingredientsList)}
          </div>
          <div style={{ width: 200 }}>
            {isPieChartDataEmpty(pieChartData) ? (
              <div
                style={{
                  display: "flex",
                  width: 200,
                  height: 200,
                  backgroundColor: "lightGrey",
                  borderRadius: "50%",
                  textAlign: "center",
                  fontSize: 16,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Cannot display graph for this drink
              </div>
            ) : (
              <Pie data={data} options={pieChartOptions} />
            )}
          </div>
        </div>
        <div style={{ width: 500, textAlign: "center" }}>
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
