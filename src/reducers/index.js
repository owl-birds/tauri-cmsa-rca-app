import { combineReducers } from "redux";
import data from "./data";
import ui from "./ui";
import yearList from "./yearList";
export default combineReducers({
  data,
  ui,
  yearList,
});
