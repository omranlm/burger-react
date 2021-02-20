import { Fragment } from "react";

import React from "react";
import CheckoutSummary from "../../../componenets/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";
import * as actionCreator from '../../../store/actions/index'

const checkout = props => {
 

  const onCheckoutCanceledhandler = () => {
    props.history.goBack();
    //    this.props.history.
    //alert('you continue!')
  };

  const onCheckoutContinueHamdler = () => {
    props.history.replace("/checkout/contact-data");
  };
 
    let summary = <Redirect to="/" />;

    if (props.ing)
    {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ing}
            onCheckoutCanceled={onCheckoutCanceledhandler}
            onCheckoutContinue={onCheckoutContinueHamdler}
          />
          <Route
            path={props.match.path + "/contact-data"}
            component={ContactData}></Route>
        </Fragment>
      );
    }
    return <div>{summary}</div>;
  
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
export default connect(mapProps, mapDispatch)(checkout);
