// style
import classes from "./TwoLevel.module.css";

// react
// import { useEffect } from "react";

// COMPONENTS
// import DropFileInput from "../ui/DropFileInput";
import InputTypeSelectionMenu from "../ui/InputTypeSelectionMenu";
import Table from "../ui/table/";
import TwoLevelMenu from "../ui/TwoLevelMenu";
import TableMenu from "../ui/tableMenu/";

import { useSelector } from "react-redux";

// // actions
// import { addingRow } from "../../actions/data";

// // STATE CONSTANT ACTION
// import { ALL_YEARS } from "../../constants/actionTypes";

// FORMULA
import { two_level_all } from "../../helpers/cmsa-two-level";
// UTILS
import { uniqueRow, uniqueYear } from "../../helpers/utils";
const TwoLevel = () => {
  // const dispatch = useDispatch();
  const state = useSelector((state) => state.data);
  const ui = useSelector((state) => state.ui);
  const yearState = useSelector((state) => state.yearList);
  console.log(state);
  console.log(yearState);
  // console.log(ui);
  const twoLevelResult = state.isLoaded
    ? ui.isOptionSelected
      ? two_level_all(
          state.data,
          "Dunia",
          uniqueRow(state.data, "country"),
          ui.firstYear,
          ui.secondYear,
          ui.cmsaType
        )
      : null
    : null;
  // console.log(ui.isOptionSelected);
  const uniqueYearList = state.isLoaded
    ? state.isSelfInput
      ? yearState.allYears
      : uniqueYear(state.data)
    : [];
  // console.log(uniqueYearList);
  // console.log(yearState.allYears);
  // console.log(state.data);
  // useEffect(() => {
  //   dispatch({ type: ALL_YEARS, allYears: uniqueYearList });
  // }, [uniqueYearList]);
  return (
    <main className={classes.content}>
      <div>
        <h1 className={classes.title}>TWO LEVEL</h1>
        {/* {state.isLoaded ? null : <DropFileInput />} */}
        {state.isLoaded ? null : (
          <InputTypeSelectionMenu
            cmsaType={2}
            isWorldData={false}
            isLevelTwo={true}
          />
        )}
      </div>
      {state.isLoaded ? (
        <div className={classes.tableWrapper}>
          <TableMenu data={state.data} />
          <Table
            isEditAble={true}
            columns={state.data.columns}
            data={state.data}
            isSelfInput={state.isSelfInput}
          />
          <TwoLevelMenu yearList={uniqueYearList} />
          {ui.isOptionSelected ? (
            <>
              <h1>CMSA FOR {`${ui.firstYear}-${ui.secondYear}`}</h1>
              <Table columns={twoLevelResult.columns} data={twoLevelResult} />
            </>
          ) : null}
        </div>
      ) : null}
    </main>
  );
};
export default TwoLevel;
