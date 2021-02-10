import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./componenets/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
            <Route path="/" exact component={BurgerBuilder}></Route>
            <Route path="/checkout" component={Checkout}></Route>
            
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
