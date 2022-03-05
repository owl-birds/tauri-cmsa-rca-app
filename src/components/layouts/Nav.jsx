import classes from "./style.module.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className={classes.nav}>
      <Link className={classes.link} to="/cmsa">
        CMSA
      </Link>
      <Link className={classes.link} to="/rca">
        RCA
      </Link>
    </nav>
  );
};
export default Nav;
