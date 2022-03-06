import classes from "./TwoLevelMenu.module.css";
import { useRef, useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
// CONSTANT REDUX
import { OPTIONS_UI_TWO_LEVEL } from "../../constants/actionTypes";
// components
import Select from "./Select";
import RadioInput from "./RadioInput";
// utils
import { sortingNumArr } from "../../helpers/utils";

const TwoLevelMenu = ({ yearList }) => {
  // console.log("TwoLevelMenu HERE");
  // console.log("2level_menu", yearList);
  // REDUX STATE  for year
  // const yearState = useSelector((state) => state.yearList);
  // const { isSelfInput } = useSelector((state) => state.data);
  // console.log(yearState);
  // console.log(isSelfInput);
  // REF
  const firstYearRef = useRef(null);
  const secondYearRef = useRef(null);
  const [cmsaType, setCmsaType] = useState(Boolean);
  // STATE
  const [firstYear, setFirstYear] = useState(yearList);
  const [secondYear, setSecondYear] = useState(yearList);
  // console.log(sortingNumArr(secondYear));
  // console.log(sortingNumArr(firstYear));
  // console.log(sortingNumArr([23, 43, 12, 34, 54, 123]));
  // DISPATHC (REDUX)
  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (firstYearRef.current.value === secondYearRef.current.value) {
      console.log("CHANGE THE YEAR");
    } else {
      console.log(cmsaType);
      dispatch({
        type: OPTIONS_UI_TWO_LEVEL,
        year0: firstYearRef.current.value,
        year1: secondYearRef.current.value,
        cmsaType,
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
        <div className={classes.inputWrapper}>
          <h1>Pilih tipe CMSA</h1>
          <RadioInput
            detail={[
              { value: true, name: "commodity" },
              { value: false, name: "region" },
            ]}
            setRadioValue={setCmsaType}
          />
        </div>

        <button className={classes.btn} type="submit">
          Proses
        </button>
      </form>
    </section>
  );
};
export default TwoLevelMenu;
