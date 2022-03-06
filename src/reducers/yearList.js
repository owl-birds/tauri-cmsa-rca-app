// constant
import {
  UPDATE_FIRST_YEAR,
  UPDATE_SECOND_YEAR,
  ALL_YEARS,
  RESET_YEARS,
} from "../constants/actionTypes";

const yearList = (yearList = {}, action) => {
  switch (action.type) {
    case RESET_YEARS:
      return { ...yearList, allYears: [], message: "year list here" };
    case UPDATE_FIRST_YEAR:
      return {
        ...yearList,
        firstYear: action.first,
      };
    case UPDATE_SECOND_YEAR:
      return {
        ...yearList,
        secondYear: action.second,
      };
    case ALL_YEARS:
      if (yearList.allYears) yearList.allYears.push(+action.allYears);
      //   console.log("YEARLIST HERE", action.allYears);
      else {
        const temp = [];
        temp.push(+action.allYears);
        return { ...yearList, allYears: temp };
      }
      return {
        ...yearList,
      };
    default:
      if (!yearList.allYears)
        return { ...yearList, allYears: [], message: "year list here" };
      else
        return {
          ...yearList,
          message: "year list here",
        };
  }
};

export default yearList;
