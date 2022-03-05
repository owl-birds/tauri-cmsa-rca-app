import classes from "../style/style.module.css";

import Nav from "../nav";
const Header = () => {
  return (
    <header className={classes.header}>
      <Nav />
    </header>
  );
};
export default Header;
