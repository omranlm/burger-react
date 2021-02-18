import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import Layout from "./componenets/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from './containers/Auth/Logout/Logout'
import * as actionCraetor from './store/actions/index'
import { connect } from "react-redux";
import asyncComponent from './hoc/asyncComponenet/asyncComponenet'

const asyncCheckout = asyncComponent(()=>
{
  return import ('./containers/BurgerBuilder/Checkout/Checkout')
})


const asyncOrders = asyncComponent(()=>
{
  return import ('./containers/Orders/Orders')
})

const asyncAuth = asyncComponent(()=>
{
  return import ('./containers/Auth/Auth')
})
class App extends Component {
  
  componentDidMount (){
    this.props.onAuthCheckState();
  }
  render() {

    let routes = (
      <Switch>
         <Route path="/auth"  component={asyncAuth}/>
         <Route path="/" exact component={BurgerBuilder}></Route>
         <Redirect to="/" ></Redirect>
         
      </Switch>
    );

    if (this.props.isAuth)
    {
      routes = <Switch>
      <Route path="/checkout" component={asyncCheckout}></Route>
      <Route path="/orders"  component={asyncOrders}/>
      <Route path="/logout"  component={Logout}/>
      <Route path="/auth"  component={asyncAuth}/>
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
