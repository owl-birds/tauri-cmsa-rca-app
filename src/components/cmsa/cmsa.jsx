import classes from "./cmsa.module.css";
// import { useSelector } from "react-redux";
// COMPONENTS
import CmsaNav from "../layouts/cmsaNav";

// redux to clear all state
import { useDispatch } from "react-redux";
import { CLEAR_STATE, RESET_YEARS } from "../../constants/actionTypes";
// react useEffect
import { useEffect } from "react";

const Cmsa = () => {
  // const data = useSelector((state) => state.data);
  // console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("initialize state cleanup");
    dispatch({ type: CLEAR_STATE });
    dispatch({ type: RESET_YEARS });
  }, []);
  return (
    <main className={classes.content}>
      <CmsaNav />
    </main>
  );
};
export default Cmsa;
