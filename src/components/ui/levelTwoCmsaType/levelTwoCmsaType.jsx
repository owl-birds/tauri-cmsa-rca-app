import classes from "./levelTwoCmsaType.module.css";

// redux
import { useDispatch } from "react-redux";

// action
import { selfInputData } from "../../../actions/data";

const LevelTwoCmsaType = ({ cmsaType }) => {
  const dispatch = useDispatch();
  const buttonHandler = (isCommodity) => {
    // console.log(isCommodity);
    dispatch(selfInputData(cmsaType, false, isCommodity));
  };
  return (
    <div>
      <h4 className={classes.title}>Pilih tipe cmsa</h4>
      <div className={classes.buttonBox}>
        <button onClick={() => buttonHandler(true)} className={classes.button}>
          Commodity
        </button>
        <button onClick={() => buttonHandler(false)} className={classes.button}>
          Regional
        </button>
      </div>
    </div>
  );
};

export default LevelTwoCmsaType;
