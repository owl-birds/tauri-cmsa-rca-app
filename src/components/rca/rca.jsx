import classes from "./rca.module.css";
// redux to clear all state
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_STATE, RESET_YEARS } from "../../constants/actionTypes";
// react useEffect
import { useEffect } from "react";

// COMPONENTS
import RcaNav from "../ui/rcaNav/";

const Rca = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("initialize state cleanup");
    dispatch({ type: CLEAR_STATE });
    dispatch({ type: RESET_YEARS });
  }, []);
  // states
  const state = useSelector((state) => state.data);
  console.log(state);
  return (
    <main className={classes.contents}>
      <h1 className={classes.title}>RCA</h1>
      <RcaNav />
    </main>
  );
};
export default Rca;
