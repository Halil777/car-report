const generateReportText = (dashboardData, cardData) => {
  if (
    !dashboardData ||
    !dashboardData.top ||
    !dashboardData.brand_price_comparison
  ) {
    return "No data available";
  }

  const topCars = dashboardData.top.slice(0, 10);
  const topCarsText = topCars
    .map(
      (car, index) =>
        `${index + 1}. ${car._source.markasy} ${car._source.ady} ${
          car._source.yyly
        } - ${car._source.bahasy.toLocaleString()} TMT`
    )
    .join("\n");

  const totalBrands = dashboardData.brand_price_comparison.buckets?.length ?? 0;

  const averageCar = dashboardData.brand_price_comparison.buckets?.reduce(
    (prev, curr) => (prev.avg_price.value > curr.avg_price.value ? prev : curr),
    dashboardData.brand_price_comparison.buckets[0]
  );

  const cheapestCar = dashboardData.brand_price_comparison.buckets
    ?.filter((car) => car.min_price.value > 0)
    ?.reduce(
      (prev, curr) =>
        prev.min_price.value < curr.min_price.value ? prev : curr,
      dashboardData.brand_price_comparison.buckets[0]
    );

  const mostExpensiveCar = dashboardData.brand_price_comparison.buckets?.reduce(
    (prev, curr) => (prev.max_price.value > curr.max_price.value ? prev : curr),
    dashboardData.brand_price_comparison.buckets[0]
  );

  const cardInfo = cardData
    .map((card) => `${card.title}: ${card.count}`)
    .join("\n");

  return `
  🚗 **Dashboard Summary** 🚗

  **Top 10 Cars:**
  ${topCarsText}

  **Dashboard Cards Information:**

  **Total Car Brands:**
  ${totalBrands}

  **Average Car Price:**
  ${
    averageCar
      ? `${averageCar.key} / ${averageCar.avg_price.value.toLocaleString()} TMT`
      : "N/A"
  }

  **Cheapest Car:**
  ${
    cheapestCar
      ? `${
          cheapestCar.key
        } / ${cheapestCar.min_price.value.toLocaleString()} TMT`
      : "N/A"
  }

  **Most Expensive Car:**
  ${
    mostExpensiveCar
      ? `${
          mostExpensiveCar.key
        } / ${mostExpensiveCar.max_price.value.toLocaleString()} TMT`
      : "N/A"
  }

  
  ${cardInfo}
  `;
};

module.exports = generateReportText;
