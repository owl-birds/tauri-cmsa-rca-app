import classes from "./style/style.module.css";

import { Link } from "react-router-dom";
const CmsaNav = () => {
  return (
    <section className={classes.homeNav}>
      <div className={classes.navBox}>
        <Link className={classes.homeNavLink} to="/cmsa/one-level">
          One Level Decomposition
        </Link>
      </div>
      <div className={classes.navBox}>
        <Link className={classes.homeNavLink} to="/cmsa/two-level">
          Two Level Decomposition
        </Link>
      </div>
      <div className={classes.navBox}>
        <Link className={classes.homeNavLink} to="/cmsa/three-level">
          Three Level Decomposition
        </Link>
      </div>
    </section>
  );
};
export default CmsaNav;
