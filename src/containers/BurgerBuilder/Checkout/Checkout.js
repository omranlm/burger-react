import { Component, Fragment } from "react";

import React from "react";
import CheckoutSummary from "../../../componenets/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router";
import ContactData from "./ContactData/ContactData";
import axios from "../../../axios";
import { connect } from "react-redux";
import * as actionCreator from '../../../store/actions/index'
class Checkout extends Component {
  state = {
    loading: false,
  };
  
  onCheckoutCanceledhandler = () => {
    this.props.history.goBack();
    //    this.props.history.
    //alert('you continue!')
  };

  onCheckoutContinueHamdler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ing)
    {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ing}
            onCheckoutCanceled={this.onCheckoutCanceledhandler}
            onCheckoutContinue={this.onCheckoutContinueHamdler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}></Route>
        </Fragment>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
};

const mapDispatch = dispatch =>
{
  return{
    onPurchaseInit:() => dispatch(actionCreator.purchaseInit()),
  }
}
export default connect(mapProps, mapDispatch)(Checkout);
