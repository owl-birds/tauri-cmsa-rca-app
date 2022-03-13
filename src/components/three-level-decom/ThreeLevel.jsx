import classes from "./ThreeLevel.module.css";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import InputTypeSelectionMenu from "../ui/InputTypeSelectionMenu";
import Table from "../ui/table/";
import TableMenu from "../ui/tableMenu/";
import ThreeLevelMenu from "../ui/threeLevelMenu/";

// helpers
import { uniqueRow, uniqueYear } from "../../helpers/utils";

// cmsa formula
import { threeLevelAll } from "../../helpers/cmsa-three-level";

const ThreeLevel = () => {
  const state = useSelector((state) => state.data);
  const yearState = useSelector((state) => state.yearList);
  const ui = useSelector((state) => state.ui);

  console.log(state);
  console.log(ui);
  console.log(yearState);
  const threeLevelResult =
    state.isLoaded && state.isWorldDataLoaded
      ? ui.isOptionSelected
        ? threeLevelAll(
            state.worldData,
            state.data,
            ui.firstYear,
            ui.secondYear
          )
        : null
      : null;
  console.log(threeLevelResult);
  const uniqueYearList =
    state.isLoaded && state.isWorldDataLoaded
      ? state.isSelfInput
        ? yearState.allYears
        : uniqueYear(state.data)
      : [];
  // console.log(uniqueYearList);
  return (
    <main className={classes.content}>
      <div>
        <h1 className={classes.title}>THREE LEVEL</h1>
      </div>
      <div className={classes.dataInputBox}>
        {state.isLoaded ? (
          <>
            <TableMenu
              data={state.data}
              menuTitle={"Country Table"}
              isWorldData={false}
              isSelfInput={state.isSelfInput}
            />
            <div className={classes.table}>
              <Table
                data={state.data}
                columns={state.data.columns}
                isEditAble={true}
                isSelfInput={state.isSelfInput}
              />
            </div>
          </>
        ) : (
          <>
            <h4 className={classes.dataInputTitle}>Country data</h4>
            <InputTypeSelectionMenu cmsaType={3} isWorldData={false} />
          </>
        )}
        {state.isWorldDataLoaded ? (
          <>
            <TableMenu
              data={state.worldData}
              menuTitle={"World Table"}
              isWorldData={true}
              isSelfInput={state.isWorldSelfInput}
            />
            <div className={classes.table}>
              <Table
                data={state.worldData}
                columns={state.worldData.columns}
                isEditAble={true}
                isWorldData={true}
              />
            </div>
          </>
        ) : (
          <>
            <h4 className={classes.dataInputTitle}>World data</h4>
            <InputTypeSelectionMenu cmsaType={3} isWorldData={true} />
          </>
        )}
      </div>
      <div className={classes.optionOutputBox}>
        {state.isLoaded && state.isWorldDataLoaded ? (
          <ThreeLevelMenu yearList={uniqueYearList} />
        ) : null}
        {ui.isOptionSelected ? (
          <>
            <h1>CMSA FOR {`${ui.firstYear}-${ui.secondYear}`}</h1>
            <Table columns={threeLevelResult.columns} data={threeLevelResult} />
          </>
        ) : null}
      </div>
    </main>
  );
};
export default ThreeLevel;
