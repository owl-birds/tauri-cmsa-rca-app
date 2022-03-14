import classes from "./rca.module.css";
// redux to clear all state
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_STATE, RESET_YEARS } from "../../constants/actionTypes";
// react useEffect
import { useEffect } from "react";

// COMPONENTS
import RcaNav from "../ui/rcaNav/";
import Table from "../ui/table/";
import TableMenu from "../ui/tableMenu/";
import RcaCalcMenu from "../ui/rcaCalcMenu";
import MultipleRcaOutput from "../ui/multipleRcaOutput/";

// utils
import { uniqueYear, uniqueRow } from "../../helpers/utils";
import { calcRca_all, calcRca_all_countries } from "../../helpers/rca";

const Rca = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("initialize state cleanup");
    dispatch({ type: CLEAR_STATE });
    dispatch({ type: RESET_YEARS });
  }, []);
  // states
  const state = useSelector((state) => state.data);
  const yearState = useSelector((state) => state.yearList);
  const ui = useSelector((state) => state.ui);
  console.log(ui);
  // console.log(state);
  const uniqueYearList =
    state.isLoaded && state.isWorldDataLoaded
      ? state.isSelfInput
        ? yearState.allYears
        : uniqueYear(state.data)
      : [];
  // console.log(uniqueYearList);
  const rcaResult =
    state.isLoaded && state.isWorldDataLoaded
      ? ui.isOptionSelected
        ? ui.isOneCountry === 1
          ? calcRca_all(state.data, state.worldData, ui.yearSelected)
          : calcRca_all_countries(state.data, state.worldData, ui.yearSelected)
        : null
      : null;
  console.log(rcaResult);
  return (
    <main className={classes.contents}>
      <h1 className={classes.title}>RCA</h1>
      {ui.isOneCountry ? (
        ui.isOneCountry === 1 ? (
          <h3 className={classes.textCenter}>One Country</h3>
        ) : (
          <h3 className={classes.textCenter}>Multiple Country</h3>
        )
      ) : null}
      {state.isLoaded ? (
        <div className={classes.tableBox}>
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
            />
          </div>
        </div>
      ) : null}
      {state.isWorldDataLoaded ? (
        <div className={classes.tableBox}>
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
        </div>
      ) : null}
      {state.isLoaded && state.isWorldDataLoaded ? (
        <RcaCalcMenu yearList={uniqueYearList} />
      ) : (
        <RcaNav />
      )}
      {rcaResult && ui.isOptionSelected ? (
        ui.isOneCountry === 1 ? (
          <div className={classes.table}>
            <Table data={rcaResult} columns={rcaResult.columns} />
          </div>
        ) : (
          <MultipleRcaOutput
            countriesList={uniqueRow(state.data, "country", "dunia")}
            data={rcaResult ? rcaResult : []}
          />
        )
      ) : null}
    </main>
  );
};
export default Rca;
