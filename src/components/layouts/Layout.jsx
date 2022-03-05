import classes from "./style/style.module.css";

import Header from "./header/";
const Layout = (props) => {
  return (
    <section className={classes.layout}>
      <Header />
      {props.children}
    </section>
  );
};
export default Layout;
