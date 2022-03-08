import {
  READ_CSV,
  READ_CSV_WORLD_DATA,
  CLEAR_STATE,
  EDIT_DATA,
  SELF_INPUT_DATA_COUNTRY,
  ADD_ROW_COUNTRY,
  ADD_YEAR_COUNTRY,
  DELETE_YEAR_COUNTRY,
  DELETE_YEAR_WORLD_DATA,
  ADD_YEAR_WORLD_DATA,
  ADD_ROW_WORLD_DATA,
  EDIT_WORLD_DATA,
  SELF_INPUT_DATA_WORLD,
} from "../constants/actionTypes";

const data = (data = [], action) => {
  switch (action.type) {
    case READ_CSV:
      return {
        ...data,
        data: action.payload,
        isLoaded: true,
        isSelfInput: false,
        message: "DATA HAD BEEN READ",
      };
    case READ_CSV_WORLD_DATA:
      // console.log("data reducer");
      // console.log(action.payload);
      return { ...data, worldData: action.payload, isWorldDataLoaded: true };
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
        isSelfInput: true,
        message: "SELF INPUT DATA COUNTRY",
      };
    // ADD
    case ADD_ROW_COUNTRY:
      return { ...data, data: action.addedData };
    case ADD_YEAR_COUNTRY:
      // console.log(action.newData);
      // return data;
      return { ...data, data: action.newData };
    // WORLD
    // SELF INPUt
    case SELF_INPUT_DATA_WORLD:
      return {
        ...data,
        worldData: action.payload,
        isWorldDataLoaded: true,
        isWorldSelfInput: true,
        message: "SELF INPUT DATA COUNTRY",
      };
    // edit world
    case EDIT_WORLD_DATA:
      return { ...data, worldData: action.editedData };
    // add world
    case ADD_ROW_WORLD_DATA:
      return { ...data, worldData: action.addedData };
    case ADD_YEAR_WORLD_DATA:
      return { ...data, worldData: action.newData };
    // DELETE
    case DELETE_YEAR_COUNTRY:
      return { ...data, data: action.editedData };
    case DELETE_YEAR_WORLD_DATA:
      return { ...data, worldData: action.editedData };
    default:
      if (
        (data.data && data.data.length !== 0) ||
        (data.worldData && data.worldData.length !== 0)
      )
        // if data still exist
        return {
          ...data,
          // isLoaded: true,
          // isWorldDataLoaded: true,
          message: "DEAFULT BUT DATA STILL EXIST",
        };
      else
        return {
          ...data,
          isLoaded: false,
          isWorldDataLoaded: false,
          message: "REDUX DEFAULT",
        };
  }
};
export default data;
