import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state =
    {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () =>
    {
        this.setState({
            showSideDrawer: false,
        });
    }
    toggleSideDrawer = () =>
    {
        this.setState((prevState) =>
        {
            return {
                showSideDrawer: !prevState.showSideDrawer,
            }
        });
    } 
    render() {
    return (
      <React.Fragment>
        <Toolbar menuClicked={this.toggleSideDrawer}></Toolbar>
        <SideDrawer open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}>

        </SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
