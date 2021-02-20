import React, { useState } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const layout = props => {
   
    const [showSideDrawer,setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () =>
    {
        setShowSideDrawer(false);
    }
    const toggleSideDrawer = () =>
    {
        setShowSideDrawer(!showSideDrawer);
    } 
  
    return (
      <React.Fragment>
        <Toolbar menuClicked={toggleSideDrawer}
        isAuth={props.isAuth}></Toolbar>
        <SideDrawer open={showSideDrawer} 
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuth}>

        </SideDrawer>
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    );
  
}

const mapStateToProps = state =>
{
    return {
        isAuth : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(layout);
