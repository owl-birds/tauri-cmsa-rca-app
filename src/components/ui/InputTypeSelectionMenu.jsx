import classes from "./InputTypeSelectionMenu.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
// REDUX STUFFS
// import { SELF_INPUT_DATA_COUNTRY } from "../../constants/actionTypes";
// actions
import { selfInputData } from "../../actions/data";

// COMPONENTS
import DropFileInput from "./dropFileInput/";
import LevelTwoCmsaType from "./levelTwoCmsaType/";
// import Table from "./Table";
const InputTypeSelectionMenu = ({
  cmsaType,
  isWorldData = false,
  isLevelTwo = false,
}) => {
  // REDUX STUFFS
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(true);
  const [isSelf, setIsSelf] = useState(false);
  console.log("selection menu rendering");
  // func related to state
  const setMenu = (value = true) => {
    setIsMenu(() => value);
  };
  const setInputType = (value = false) => {
    setIsSelf(() => value);
  };
  const fileInput = () => {
    setMenu(false);
    setInputType(false);
  };
  const selfInput = () => {
    if (!isLevelTwo) dispatch(selfInputData(cmsaType, isWorldData));
    setMenu(false);
    setInputType(true);
  };
  return (
    <section className={classes.selectionMenuBox}>
      {isMenu ? (
        <div className={classes.buttonsBox}>
          <button className={classes.button} onClick={() => fileInput()}>
            Input with .CSV file
          </button>
          <button className={classes.button} onClick={() => selfInput()}>
            Self Input
          </button>
        </div>
      ) : isSelf ? (
        isLevelTwo ? (
          <LevelTwoCmsaType cmsaType={cmsaType} />
        ) : (
          <h1>SIKE</h1>
        )
      ) : (
        <DropFileInput />
      )}
    </section>
  );
};
export default InputTypeSelectionMenu;
