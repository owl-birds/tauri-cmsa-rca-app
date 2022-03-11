// style
import classes from "./threeLevelMenu.module.css";

import { useRef, useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
// CONSTANT REDUX
import { OPTIONS_UI_THREE_LEVEL } from "../../../constants/actionTypes";
// components
import Select from "../Select";
// utils
import { sortingNumArr } from "../../../helpers/utils";
const ThreeLevelMenu = ({ yearList }) => {
  console.log(yearList);
  // REF
  const firstYearRef = useRef(null);
  const secondYearRef = useRef(null);
  // STATE
  const [firstYear, setFirstYear] = useState(yearList);
  const [secondYear, setSecondYear] = useState(yearList);

  // DISPATHC (REDUX)
  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (firstYearRef.current.value === secondYearRef.current.value) {
      console.log("CHANGE THE YEAR");
    } else {
      //   console.log({
      //     year0: firstYearRef.current.value,
      //     year1: secondYearRef.current.value,
      //   });
      dispatch({
        type: OPTIONS_UI_THREE_LEVEL,
        year0: firstYearRef.current.value,
        year1: secondYearRef.current.value,
      });
    }
  };
  const onChangeHandlerFirst = () => {
    setSecondYear(() =>
      yearList.filter((year) => parseInt(year) > firstYearRef.current.value)
    );
  };
  const onChangeHandlerSecond = () => {
    setFirstYear(() =>
      yearList.filter((year) => parseInt(year) < secondYearRef.current.value)
    );
  };
  return (
    <section className={classes.menu}>
      <h1 className={classes.title}>OPTIONS</h1>
      <form onSubmit={onSubmitHandler} className={classes.formWrapper}>
        <div className={classes.inputWrapper}>
          <h1>Pilih Tahun</h1>
          <Select
            selectRef={firstYearRef}
            optionList={sortingNumArr(firstYear)}
            label={"Tahun Pertama"}
            onChange={onChangeHandlerFirst}
          />
          <Select
            selectRef={secondYearRef}
            optionList={sortingNumArr(secondYear)}
            label={"Tahun Kedua"}
            onChange={onChangeHandlerSecond}
          />
        </div>

        <button className={classes.btn} type="submit">
          Proses
        </button>
      </form>
    </section>
  );
};
export default ThreeLevelMenu;
