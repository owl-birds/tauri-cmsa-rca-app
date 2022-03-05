import {
  READ_CSV,
  CLEAR_STATE,
  EDIT_DATA,
  SELF_INPUT_DATA_COUNTRY,
  ADD_ROW_COUNTRY,
  ADD_YEAR_COUNTRY,
} from "../constants/actionTypes";

const data = (data = [], action) => {
  switch (action.type) {
    case READ_CSV:
      return {
        ...data,
        data: action.payload,
        isLoaded: true,
        message: "DATA HAD BEEN READ",
      };
    case CLEAR_STATE:
      data = [];
      return { ...data, isLoaded: false, message: "DATA STATE CLEARED" };
    case EDIT_DATA:
      // const editedData = editCell(
      //   data.data,
      //   action.editedValue,
      //   action.index,
      //   action.columnName
      // );
      // data.data = editCell(
      //   data.data,
      //   action.editedValue,
      //   action.index,
      //   action.columnName
      // );
      return { ...data, data: action.editedData };
    case SELF_INPUT_DATA_COUNTRY:
      return {
        ...data,
        data: action.payload,
        isLoaded: true,
        message: "SELF INPUT DATA COUNTRY",
      };
    case ADD_ROW_COUNTRY:
      return { ...data, data: action.addedData };
    case ADD_YEAR_COUNTRY:
      // console.log(action.newData);
      // return data;
      return { ...data, data: action.newData };
    default:
      if (data.data)
        // if data still exist
        return {
          ...data,
          isLoaded: true,
          message: "DEAFULT BUT DATA STILL EXIST",
        };
      else return { ...data, isLoaded: false, message: "REDUX DEFAULT" };
  }
};
export default data;
