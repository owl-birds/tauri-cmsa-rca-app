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
  ADD_YEAR_WORLD_DATA,
  ADD_ROW_WORLD_DATA,
  EDIT_WORLD_DATA,
  SELF_INPUT_DATA_WORLD,
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
  (data, index, columnName, editedValue, isWorldData = false) =>
  async (dispatch) => {
    try {
      const temp = await editCell(data, editedValue, index, columnName);
      // console.log(temp);
      // console.log(isWorldData);
      if (!isWorldData) dispatch({ type: EDIT_DATA, editedData: temp });
      else dispatch({ type: EDIT_WORLD_DATA, editedData: temp });
    } catch (error) {
      console.log(error);
    }
  };

export const addingRow =
  (data, isWorldData = false) =>
  async (dispatch) => {
    try {
      const temp = await api.addingRow(data);
      if (!isWorldData) dispatch({ type: ADD_ROW_COUNTRY, addedData: temp });
      else dispatch({ type: ADD_ROW_WORLD_DATA, addedData: temp });
    } catch (error) {
      console.log(error);
    }
  };

export const addingYearColumn =
  (data, newYear, isWorldData = false) =>
  async (dispatch) => {
    try {
      const temp = await addYearColumn(data, newYear);
      // console.log(temp);
      if (!isWorldData) dispatch({ type: ADD_YEAR_COUNTRY, newData: temp });
      else {
        // console.log("WORLD DATA ADD YEAR", newYear);
        dispatch({ type: ADD_YEAR_WORLD_DATA, newData: temp });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const selfInputData =
  (cmsaType, isWorldData = false, isCommodity = true) =>
  async (dispatch) => {
    try {
      let data = [];
      if (!isWorldData) {
        if (cmsaType === 3) {
          console.log(cmsaType, "THREE", "action here");
          const columns = ["country", "commodity", "region"];
          data = await makeDataForSelfinput(columns);
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
      } else {
        const columns = ["commodity"];
        data = await makeDataForSelfinput(columns);
        // console.log(data);
        dispatch({ type: SELF_INPUT_DATA_WORLD, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteColYear =
  (data, year, isWorldData = false, isSelfInput = false) =>
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
