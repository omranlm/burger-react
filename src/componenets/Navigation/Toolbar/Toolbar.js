import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../../componenets/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
const toolbar = (props) => (
  <div className={classes.Toolbar}>
    <div className={classes.DrawerToggle} onClick={props.menuClicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div style={{ height: "80%" }}>
      <Logo></Logo>
    </div>
    <nav className={classes.DesktopOnly}>
    <NavigationItems />
    </nav>
    
  </div>
);
export default toolbar;
