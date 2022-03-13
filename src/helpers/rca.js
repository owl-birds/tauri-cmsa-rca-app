import { round } from "./utils";
const calcRca = (comExCountry, countryTotalEx, comExWorld, worldTotalEx) => {
  //
  return round(comExCountry / countryTotalEx / (comExWorld / worldTotalEx));
};

const totalExportYear = (data = [], year = 2000) => {
  let result = 0;
  for (let row of data) {
    result += row[year];
  }
  return result;
};

const findCountry = (data = [], country = "indonesia") => {
  const result = data.filter(
    (row) => row["country"].toLowerCase() === country.toLowerCase()
  );
  return result;
};
const findDataCommodity = (data = [], commodity = "rice") => {
  const result = data.filter((row) => row["commodity"] === commodity);
  return result[0];
};

export const calcRca_all = (countryData = [], worldData = [], year) => {
  const result = [];
  const countryTotalEx = totalExportYear(countryData, year);
  const worldTotalEx = totalExportYear(worldData, year);
  for (let row of countryData) {
    const temp = { commodity: row["commodity"] };
    const worldExYear = findDataCommodity(worldData, row["commodity"]);
    temp["RCA"] = calcRca(
      row[year],
      countryTotalEx,
      worldExYear[year],
      worldTotalEx
    );
    result.push(temp);
  }
  const colList = ["commodity", "RCA"];
  result.columns = [];
  for (let col of colList) {
    result.columns.push({ Header: col, accessor: col });
  }
  return result;
};

const uniqueCountries = (countriesData = []) => {
  const result = [];
  for (let row of countriesData) {
    const isExist = result.some(
      (countryName) => countryName === row["country"].toLowerCase()
    );
    if (
      !isExist &&
      row["country"].toLowerCase() !== "dunia" &&
      row["country"].toLowerCase() !== "world"
    ) {
      result.push(row["country"].toLowerCase());
    }
  }
  return result;
};

export const calcRca_all_countries = (
  countriesData = [],
  worldData = [],
  year
) => {
  const result = {};
  const uniqueCountriesList = uniqueCountries(countriesData);
  for (let countryname of uniqueCountriesList) {
    const countryData = findCountry(countriesData, countryname);
    const temp = calcRca_all(countryData, worldData, year);
    result[countryname] = temp;
  }
  return result;
};
