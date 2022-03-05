import classes from "./cmsa.module.css";
import { useSelector } from "react-redux";
import CmsaNav from "../layouts/cmsaNav";
const Cmsa = () => {
  const data = useSelector((state) => state.data);
  console.log(data);
  return (
    <main className={classes.content}>
      <CmsaNav />
    </main>
  );
};
export default Cmsa;
