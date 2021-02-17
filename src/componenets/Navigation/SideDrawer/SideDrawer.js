import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let  attachedClasses = [classes.SideDrawer,classes.Close]
  if (props.open)
  {
    attachedClasses = [classes.SideDrawer,classes.Open]
  }
  return (
      <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed}></Backdrop>
    <div className={attachedClasses.join(' ')}>
      <div style={{ height: "11%", marginBottom:"32px" }}>
        <Logo></Logo>
      </div>
      <nav>
        <NavigationItems isAuth={props.isAuth}/>
      </nav>
    </div>
    </React.Fragment>
  );
};

export default sideDrawer;
