import classes from "./rcaNav.module.css";

import { useState } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
// constant types re4udx
import { RCA_IS_ONE_COUNTRY } from "../../../constants/actionTypes";

// COMPONENTS
import InputTypeSelectionMenu from "../InputTypeSelectionMenu";

const RcaNav = () => {
  const [isMenuSelected, setIsMenuSelected] = useState(false);
  const [isOneCountry, setIsOneCountry] = useState(0);
  // REDUX STATE
  const { isLoaded, isWorldDataLoaded } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  // console.log("isLoaded", isLoaded);
  const setMenuSelectedClick = () => {
    setIsMenuSelected((prevValue) => !prevValue);
  };
  const setOneCountry = () => {
    setIsOneCountry(() => 1);
    dispatch({ type: RCA_IS_ONE_COUNTRY, isOneCountry: 1 });
  };
  const setMultipleCountry = () => {
    setIsOneCountry(() => 2);
    dispatch({ type: RCA_IS_ONE_COUNTRY, isOneCountry: 2 });
  };
  // console.log("is One Country : ", isOneCountry);
  return (
    <section>
      {isMenuSelected ? null : (
        <div className={classes.buttonBox}>
          <button
            className={classes.button}
            onClick={() => {
              setMenuSelectedClick();
              setOneCountry();
            }}
          >
            One Country
          </button>
          <button
            className={classes.button}
            onClick={() => {
              setMenuSelectedClick();
              setMultipleCountry();
            }}
          >
            Multiple Country
          </button>
        </div>
      )}
      {/* {isOneCountry === 1 ? (
        <h2 className={classes.center}>One Country</h2>
      ) : null}
      {isOneCountry === 2 ? (
        <h2 className={classes.center}>Multiple Country</h2>
      ) : null} */}
      {isMenuSelected ? (
        isLoaded ? null : (
          <>
            <h4 className={classes.inputTypetitle}>Country Data</h4>
            <InputTypeSelectionMenu
              isRca={true}
              isWorldData={false}
              isOneCountry={isOneCountry}
            />
          </>
        )
      ) : null}
      {isMenuSelected ? (
        isWorldDataLoaded ? null : (
          <>
            <h4 className={classes.inputTypetitle}>World Data</h4>
            <InputTypeSelectionMenu
              isRca={true}
              isWorldData={true}
              isOneCountry={isOneCountry}
            />
          </>
        )
      ) : null}
    </section>
  );
};

export default RcaNav;
