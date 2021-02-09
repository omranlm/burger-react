import React, { Component } from "react";
import Button from '../../UI/Button/Button'
class OrderSummary extends Component
 {
    //  this could be a functional componenet
    //  componentWillUpdate ()
    //  {
    //      console.log(' OrderSummary componentWillUpdate');
    //  }
     render()
     {
        const ingSummary = Object.keys(this.props.ingredients).map((igKey) => {
            return (
              <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}> {igKey}</span>:{" "}
                {this.props.ingredients[igKey]}
              </li>
            );
          });
          return (
            <React.Fragment>
              <h3>You Order</h3>
              <p>A delicious burger with the following ingredients</p>
              <ul>{ingSummary}</ul>
              <p><strong>Total Price: {this.props.price}</strong></p>
              <p>Continue to Checkout!</p>
              <Button buttonType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
              <Button buttonType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        
            </React.Fragment>
          );
     }
 };

export default OrderSummary;
