import React, { Component } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

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
        <Toolbar menuClicked={this.toggleSideDrawer}
        isAuth={this.props.isAuth}></Toolbar>
        <SideDrawer open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}
        isAuth={this.props.isAuth}>

        </SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>
{
    return {
        isAuth : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);
