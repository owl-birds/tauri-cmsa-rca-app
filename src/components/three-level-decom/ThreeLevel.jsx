import classes from "./ThreeLevel.module.css";

// REDUX
import { useSelector } from "react-redux";

// COMPONENTS
import InputTypeSelectionMenu from "../ui/InputTypeSelectionMenu";
import Table from "../ui/table/Table/";
import TableMenu from "../ui/TableMenu/";

const ThreeLevel = () => {
  const state = useSelector((state) => state.data);
  console.log(state);
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
            />
            <Table
              data={state.data}
              columns={state.data.columns}
              isEditAble={true}
            />
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
            />
            <Table
              data={state.worldData}
              columns={state.worldData.columns}
              isEditAble={true}
              isWorldData={true}
            />
          </>
        ) : (
          <>
            <h4 className={classes.dataInputTitle}>World data</h4>
            <InputTypeSelectionMenu cmsaType={3} isWorldData={true} />
          </>
        )}
      </div>
    </main>
  );
};
export default ThreeLevel;
