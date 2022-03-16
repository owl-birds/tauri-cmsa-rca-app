import classes from "./rcaCalcMenu.module.css";

// react
import { useRef } from "react";

// REDUX
import { useDispatch } from "react-redux";

// redux types
import { OPTIONS_UI_RCA } from "../../../constants/actionTypes";

// COMPONENTS
import Select from "../Select";

// utils
import { sortingNumArr } from "../../../helpers/utils";

const RcaCalcMenu = ({ yearList }) => {
  //   console.log("RCA CALC MENU HERE : ", yearList);
  // Redux
  const dispatch = useDispatch();
  // REF
  const selectedYearRef = useRef(null);
  //   console.log("rca menu selected year", selectedYearRef.current.value);
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(selectedYearRef.current.value);
    dispatch({
      type: OPTIONS_UI_RCA,
      yearSelected: selectedYearRef.current.value,
    });
  };
  return (
    <section className={classes.menu}>
      <form className={classes.form} onSubmit={onSubmit}>
        <Select
          optionList={sortingNumArr(yearList)}
          label={"Pilih tahun"}
          selectRef={selectedYearRef}
        />
        <button className={classes.btn} type="submit">
          Proses
        </button>
      </form>
    </section>
  );
};

export default RcaCalcMenu;
