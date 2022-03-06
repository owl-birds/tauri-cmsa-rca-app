import classes from "./tableMenu.module.css";
// reduxsss
import { useDispatch } from "react-redux";
// constant fro redux
import {
  CLEAR_STATE,
  ALL_YEARS,
  RESET_YEARS,
} from "../../../constants/actionTypes";
// actions
import { addingRow, addingYearColumn } from "../../../actions/data";
// utils
import { uniqueYear } from "../../../helpers/utils";
const TableMenu = ({ data }) => {
  const dispatch = useDispatch();
  const resetHandler = () => {
    dispatch({ type: CLEAR_STATE });
    dispatch({ type: RESET_YEARS });
  };
  const addARow = () => {
    dispatch(addingRow(data));
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newYearCol = event.target.querySelector("input");
    const isExist = uniqueYear(data).some(
      (year) => String(year) === newYearCol.value
    );
    if (isNaN(+newYearCol.value) || newYearCol.value === "" || isExist) {
      newYearCol.classList.add(classes.wrongInput);
    } else {
      newYearCol.classList.remove(classes.wrongInput);
      // console.log(newYearCol.value);
      dispatch({ type: ALL_YEARS, allYears: newYearCol.value });
      dispatch(addingYearColumn(data, newYearCol.value));
    }
  };
  return (
    <div className={classes.addingMenu}>
      <h4 className={classes.h4}>Table Menu</h4>
      <button className={classes.btn} onClick={() => resetHandler()}>
        Reset Data
      </button>
      <button className={classes.btn} onClick={addARow}>
        Add a Row
      </button>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <input placeholder="ex:2019" type="text" className={classes.input} />
        <button className={classes.btnForm}>Add Year</button>
      </form>
    </div>
  );
};
export default TableMenu;
