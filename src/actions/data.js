import * as api from "../api";
import {
  READ_CSV,
  READ_CSV_ERROR,
  SELF_INPUT_DATA,
  EDIT_DATA,
} from "../constants/actionTypes";

// helper functions
import { editCell } from "../helpers/utils";

export const parseCsv = (fileObj) => async (dispatch) => {
  try {
    console.log(fileObj);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = api.textToCsv(event.target.result);
      console.log(data);
      const columns = data.columns.map((col) => {
        return {
          Header: col,
          accessor: col,
        };
      });
      data.columns = columns;
      dispatch({ type: READ_CSV, payload: data });
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
      const temp = editCell(data, editedValue, index, columnName);
      // console.log(temp);
      dispatch({ type: EDIT_DATA, editedData: temp });
    } catch (error) {
      console.log(error);
    }
  };
