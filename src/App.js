import React, { Component, Fragment } from "react";
import { BrowserRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./componenets/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actionCraetor from './store/actions/index'
import { connect } from "react-redux";
class App extends Component {
  
  componentDidMount (){
    this.props.onAuthCheckState();
  }
  render() {

    let routes = (
      <Switch>
         <Route path="/auth"  component={Auth}/>
         <Route path="/" exact component={BurgerBuilder}></Route>
         <Redirect to="/" ></Redirect>
         
      </Switch>
    );

    if (this.props.isAuth)
    {
      routes = <Switch>
      <Route path="/checkout" component={Checkout}></Route>
      <Route path="/orders"  component={Orders}/>
      <Route path="/logout"  component={Logout}/>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" ></Redirect>
     
      </Switch>
      ;
    }
    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}

          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return {
    isAuth : state.auth.token !== null
  }
}
const mapDispaotch = dispatch =>
{
  return {
    onAuthCheckState: () => dispatch (actionCraetor.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispaotch)(App));
