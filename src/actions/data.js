import * as api from "../api";
import {
  READ_CSV,
  READ_CSV_ERROR,
  READ_CSV_WORLD_DATA,
  SELF_INPUT_DATA_COUNTRY,
  EDIT_DATA,
  ADD_ROW_COUNTRY,
  ADD_YEAR_COUNTRY,
  DELETE_YEAR_COUNTRY,
  REMOVE_YEAR_ALL_YEARS,
  DELETE_YEAR_WORLD_DATA,
} from "../constants/actionTypes";

// helper functions
import {
  editCell,
  addYearColumn,
  makeDataForSelfinput,
  deleteCol,
} from "../helpers/utils";

export const parseCsv =
  (fileObj, isWorldData = false) =>
  async (dispatch) => {
    try {
      // console.log(fileObj);
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = api.textToCsv(event.target.result);
        const columns = data.columns.map((col) => {
          return {
            Header: col,
            accessor: col,
          };
        });
        data.columns = columns;
        if (!isWorldData) dispatch({ type: READ_CSV, payload: data });
        else dispatch({ type: READ_CSV_WORLD_DATA, payload: data });
      };
      reader.readAsText(fileObj);

      // const data = await api.textToCsv(stringData);
      // const columns = data.columns.map((col) => {
      //   return {
      //     Header: col,
      //     accessor: col,
      //   };
      // });
      // data.columns = columns;
      // dispatch({ type: READ_CSV, payload: data });
    } catch (error) {
      dispatch({ type: READ_CSV_ERROR, error: error.message });
    }
  };
export const editData =
  (data, index, columnName, editedValue) => async (dispatch) => {
    try {
      const temp = await editCell(data, editedValue, index, columnName);
      // console.log(temp);
      dispatch({ type: EDIT_DATA, editedData: temp });
    } catch (error) {
      console.log(error);
    }
  };

export const addingRow =
  (data, isCountry = true) =>
  async (dispatch) => {
    try {
      const temp = await api.addingRow(data);
      if (isCountry) dispatch({ type: ADD_ROW_COUNTRY, addedData: temp });
    } catch (error) {
      console.log(error);
    }
  };

export const addingYearColumn =
  (data, newYear, isCountry = true) =>
  async (dispatch) => {
    try {
      const temp = await addYearColumn(data, newYear);
      // console.log(temp);
      if (isCountry) dispatch({ type: ADD_YEAR_COUNTRY, newData: temp });
    } catch (error) {
      console.log(error);
    }
  };

export const selfInputData =
  (cmsaType, isWorldData, isCommodity = true) =>
  async (dispatch) => {
    try {
      let data = [];
      if (!isWorldData) {
        if (cmsaType === 3) {
          console.log(cmsaType, "THREE", "action here");
        } else if (cmsaType === 2) {
          console.log(cmsaType, "TWO", "action here");
          if (isCommodity) {
            const columns = ["country", "commodity"];
            data = await makeDataForSelfinput(columns);
            console.log(data);
          } else {
            const columns = ["country", "region"];
            data = await makeDataForSelfinput(columns);
            console.log(data);
          }
        } else if (cmsaType === 1) {
          const columns = ["country"];
          data = await makeDataForSelfinput(columns);
          console.log(cmsaType, "ONE", "action here");
        }
        dispatch({ type: SELF_INPUT_DATA_COUNTRY, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteColYear =
  (data, year, isWorldData, isSelfInput = false) =>
  async (dispatch) => {
    try {
      if (!isWorldData) {
        if (!isSelfInput) {
          console.log(
            "ACTION DELETE YEAR COUNTRY HERE",
            year,
            "self:",
            isSelfInput
          );
          const tempData = await deleteCol(data, year);
          // console.log(tempData);
          dispatch({ type: DELETE_YEAR_COUNTRY, editedData: tempData });
        } else {
          console.log("SELF INPUT DELETE YEAR", year, "self:", isSelfInput);
          const tempData = await deleteCol(data, year);
          // console.log(tempData);
          dispatch({ type: DELETE_YEAR_COUNTRY, editedData: tempData });
          dispatch({ type: REMOVE_YEAR_ALL_YEARS, year });
        }
      } else {
        if (!isSelfInput) {
          console.log(
            "ACTION DELETE YEAR COUNTRY HERE",
            year,
            "self:",
            isSelfInput
          );
          const tempData = await deleteCol(data, year);
          console.log(tempData);
          dispatch({ type: DELETE_YEAR_WORLD_DATA, editedData: tempData });
        } else {
          console.log("SELF INPUT DELETE YEAR", year, "self:", isSelfInput);
          const tempData = await deleteCol(data, year);
          console.log(tempData);
          dispatch({ type: DELETE_YEAR_WORLD_DATA, editedData: tempData });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
