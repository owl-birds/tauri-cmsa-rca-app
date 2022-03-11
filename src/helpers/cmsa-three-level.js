// UTILS
import { round } from "./utils";
// TOTAL EXPORT BASED ON YEAR
const totalExportYear = (data = [], year) => {
  let result = 0;
  for (let row of data) {
    result += +row[year];
  }
  return result;
};

// FINDING THE SPECIFIC List of DATA
const findWithCommodity = (data = [], commodity) => {
  const result = data.filter((row) => row["commodity"] === commodity);
  return result;
};
const findWithRegion = (data = [], region) => {
  const result = data.filter((row) => row["region"] === region);
  return result;
};
const findCountry = (data = [], countryName) => {
  const result = data.filter(
    (row) => row["country"].toLowerCase() === countryName.toLowerCase()
  );
  return result;
};
const findExportCommodityRegion = (
  countryData = [],
  // countryName = "indonesia",
  commodity = "rice",
  region = "ASEAN",
  year
) => {
  let result = {};
  for (let row of countryData) {
    if (
      // row["country"].toLowerCase() === countryName.toLowerCase() &&
      row["region"] === region &&
      row["commodity"] === commodity
    ) {
      result = { ...row };
      break;
    }
  }
  return result[year];
};

// unique commodities
const uniqueCommodityList = (data) => {
  const list = [];
  for (let row of data) {
    const isAlreadyAdded = list.some((commo) => commo === row["commodity"]);
    if (!isAlreadyAdded) {
      list.push(row["commodity"]);
    }
  }
  return list;
};
const uniqueRegionList = (data) => {
  const list = [];
  for (let row of data) {
    const isAlreadyAdded = list.some((region) => region === row["region"]);
    if (!isAlreadyAdded) {
      list.push(row["region"]);
    }
  }
  return list;
};

// console.log(findWithCommodity(c_objData, "A"));
// console.log(findWithCommodity(w_objData, "A"));
// console.log(findWithRegion(c_objData, "B"));
// console.log(findWithRegion(w_objData, "B"));

// g ir
// i : commodity
// r : country that exported the goods

//
// finding the export value of a country
// based on its commodity
const findCountryCommodity = (
  data = [],
  country = "indonesia",
  commodity = "rice"
) => {
  const result = data.filter(
    (row) =>
      row["country"].toLowerCase() === country.toLowerCase() &&
      row["commodity"].toLowerCase() === commodity.toLowerCase()
  );
  return result;
};

// calcuoalting the export growth based on the commodity
// between two point of time
const growthRate = (first, second) => {
  return (+second - +first) / +first;
};

const growthRateWorldTotal = (worldData = [], firstYear, secondYear) => {
  let firstTotal = 0;
  let secondTotal = 0;
  for (let row of worldData) {
    firstTotal += +row[firstYear];
    secondTotal += +row[secondYear];
  }
  return growthRate(firstTotal, secondTotal);
};

const growthRateWorldCommodityList = (
  worldData = [],
  firstYear,
  secondYear
) => {
  const result = {};
  for (let row of worldData) {
    result[row.commodity] =
      (+row[secondYear] - +row[firstYear]) / row[firstYear];
  }
  return result;
};

const growthRateCountryCommodity = (
  countryData = [],
  // countryName = "Indonesia",
  firstYear,
  secondYear
) => {
  const uniqueCommodities = uniqueCommodityList(countryData);
  const result = {};
  // console.log(uniqueCommodities);
  // console.log(countryData);
  for (let commodity of uniqueCommodities) {
    const commodityCountryData = findWithCommodity(countryData, commodity);
    // console.log(commodityCountryData);
    const totalExportFirst = totalExportYear(commodityCountryData, firstYear);
    const totalExportSecond = totalExportYear(commodityCountryData, secondYear);
    result[commodity] =
      (totalExportSecond - totalExportFirst) / totalExportFirst;
  }
  return result;
};

// return obj of the total export based on commodities
const exportTotalCommodity = (
  data = [],
  year,
  uniqueCommodities = undefined
) => {
  const result = {};
  const uniqueCommoditiesTemp = uniqueCommodities
    ? uniqueCommodities
    : uniqueCommodityList(data);
  for (let commodity of uniqueCommoditiesTemp) {
    result[commodity] = 0;
  }
  for (let row of data) {
    result[row.commodity] += +row[year];
  }
  return result;
};

// list of every growth in each
// combination of commodity and region
const growthRateCountryCommodityRegionList = (
  countryData = [],
  firstYear = 2010,
  secondYear = 2011
) => {
  //
  const result = {};
  for (let row of countryData) {
    // result[row.commodity] = {};
    // result[row.commodity][row.region]
    result[row.commodity + row.region] = +(
      (row[secondYear] - row[firstYear]) /
      row[firstYear]
    );
    // console.log(result);
  }
  return result;
};

// THE FORMULA BEGIN
// WORLD GROWTH EFFECT
const worldGrowthEffect = (
  worldData = [],
  countryData = [],
  firstYear = 2010,
  secondYear = 2011
) => {
  const worldGrowthTotal = growthRateWorldTotal(
    worldData,
    firstYear,
    secondYear
  );
  const countryTotalExportFirst = totalExportYear(countryData, firstYear);
  // console.log(worldGrowthTotal);
  return round(worldGrowthTotal * countryTotalExportFirst);
};
/////////////////////////

// COMMODITY EFFECT
const commodityEffect = (
  worldData = [],
  countryData = [],
  firstYear = 2011,
  secondYear = 2011
) => {
  let result = 0;
  const worldGrowthRateList = growthRateWorldCommodityList(
    worldData,
    firstYear,
    secondYear
  );
  const worldGrowthTotal = growthRateWorldTotal(
    worldData,
    firstYear,
    secondYear
  );
  const uniqueCountryCommodities = uniqueCommodityList(countryData);
  const totalExportFirstCommodity = exportTotalCommodity(
    countryData,
    firstYear
  );
  for (let commodity of uniqueCountryCommodities) {
    result +=
      (worldGrowthRateList[commodity] - worldGrowthTotal) *
      totalExportFirstCommodity[commodity];
  }
  // console.log(worldGrowthRateList);
  // console.log(worldGrowthTotal);
  // console.log(uniqueCountryCommodities);
  // console.log(totalExportFirstCommodity);
  return round(result);
};
////////////////////////

// REGIONAL MARKET EFFECT
const regionalMarketEffect = (
  worldData = [],
  countryData = [],
  firstYear = 2010,
  secondYear = 2011
) => {
  let result = 0;
  const worldGrowthRateList = growthRateWorldCommodityList(
    worldData,
    firstYear,
    secondYear
  );
  const countryGrowthRateList = growthRateCountryCommodity(
    countryData,
    firstYear,
    secondYear
  );
  const uniqueCommodities = uniqueCommodityList(countryData);
  const uniqueRegions = uniqueRegionList(countryData);
  for (let commodity of uniqueCommodities) {
    for (let region of uniqueRegions) {
      // console.log(result);
      // console.log(countryGrowthRateList[commodity]);
      // console.log(worldGrowthRateList[commodity]);
      // console.log(
      //   findExportCommodityRegion(countryData, commodity, region, firstYear)
      // );
      const countryExportFirst = findExportCommodityRegion(
        countryData,
        commodity,
        region,
        firstYear
      );
      if (countryExportFirst) {
        // not every combination of region and commodity
        // existed in the data
        // console.log(countryExportFirst);
        result +=
          (countryGrowthRateList[commodity] - worldGrowthRateList[commodity]) *
          +countryExportFirst;
      }
      // result +=
      //   (countryGrowthRateList[commodity] - worldGrowthRateList[commodity]) *
      //   +findExportCommodityRegion(countryData, commodity, region, firstYear);
    }
  }
  return round(result);
};
//////////////////////////////

// COMPETITIVENESS EFFECT
const competitivenessEffect = (
  countryData = [],
  firstYear = 2010,
  secondYear = 2011
) => {
  let result = 0;
  const countryGrowthRateList = growthRateCountryCommodity(
    countryData,
    firstYear,
    secondYear
  );
  const countryGrowthRateComRegList = growthRateCountryCommodityRegionList(
    countryData,
    firstYear,
    secondYear
  );
  const uniqueCommodities = uniqueCommodityList(countryData);
  const uniqueRegions = uniqueRegionList(countryData);
  for (let commodity of uniqueCommodities) {
    for (let region of uniqueRegions) {
      const countryComReg = countryGrowthRateComRegList[commodity + region];
      if (!countryComReg) continue;
      const countryExportFirst = findExportCommodityRegion(
        countryData,
        commodity,
        region,
        firstYear
      );
      if (!countryExportFirst) continue;
      const countryGrowthCom = countryGrowthRateList[commodity];
      result += (countryComReg - countryGrowthCom) * countryExportFirst;
      // if (countryComReg && countryExportFirst) {
      // }
    }
    // console.log(result);
  }
  // console.log(countryGrowthRateComRegList);
  return result;
};
/////////////////////////

// combining all the effect
// LEVEL THREE
export const threeLevel = (
  worldData = [],
  countryData = [],
  firstYear = 2010,
  secondYear = 2011
) => {
  const result = {};
  result["World Growth Effect"] = worldGrowthEffect(
    worldData,
    countryData,
    firstYear,
    secondYear
  );
  result["Commodity Effect"] = commodityEffect(
    worldData,
    countryData,
    firstYear,
    secondYear
  );
  result["Regional Market Effect"] = regionalMarketEffect(
    worldData,
    countryData,
    firstYear,
    secondYear
  );
  result["Competitiveness Effect"] = competitivenessEffect(
    countryData,
    firstYear,
    secondYear
  );
  return result;
};

const uniqueCol = (data = [], colName = "") => {
  const result = [];
  for (let row of data) {
    const isExist = result.some((value) => value === row[colName]);
    if (!isExist) {
      result.push(row[colName]);
    }
  }
  return result;
};

// LIST ALL COUNTRY THREE LEVEL
export const threeLevelAll = (
  worldData = [],
  countriesData = [],
  firstYear = 2010,
  secondYear = 2011
) => {
  const result = [];
  const uniqueCountries = uniqueCol(countriesData, "country");
  // console.log(uniqueCountries);
  for (let country of uniqueCountries) {
    const countryData = findCountry(countriesData, country);
    let temp = { country };
    temp = {
      ...temp,
      ...threeLevel(worldData, countryData, firstYear, secondYear),
    };
    result.push(temp);
  }
  // console.log(Object.keys(result[0]));
  result.columns = [];
  for (let colName of Object.keys(result[0])) {
    const temp = {};
    temp["Header"] = colName;
    temp["accessor"] = colName;
    result.columns.push(temp);
  }
  return result;
};
