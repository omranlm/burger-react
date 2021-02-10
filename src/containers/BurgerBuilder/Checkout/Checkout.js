import { Component } from "react";

import React from "react";
import CheckoutSummary from "../../../componenets/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router";
import ContactData from './ContactData/ContactData'
import axios from '../../../axios'
class Checkout extends Component {
  state = {
    ingredients:null,
    loading:false,
    totalPrice:0
  };
  onCheckoutCanceledhandler = () => {
      this.props.history.goBack()
    //    this.props.history.
        //alert('you continue!')
      
  };
  componentWillMount()
  {
      console.log('Checkout this.props',this.props)
        const query = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        let  totalPrice = 0;
        for (let param of query.entries())
        {
            if (param[0]==='price')
            totalPrice = +param[1];
            else
            ingredients[param[0]]= +param[1];
           
        }
        this.setState({ingredients: ingredients,
        totalPrice: totalPrice});
  }

  onCheckoutContinueHamdler = () =>
  {

    this.props.history.replace('/checkout/contact-data')
   
  }
  render() {
    return (
      <div>
        
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCanceled={this.onCheckoutCanceledhandler}
          onCheckoutContinue={this.onCheckoutContinueHamdler}
        />
        <Route path={this.props.match.path+'/contact-data'} 
        render={()=> {
            return <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}></ContactData>
        }}></Route>
      </div>
    );
  }
}

export default Checkout;
