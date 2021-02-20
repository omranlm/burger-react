import React, { Component } from "react";
import Button from '../../UI/Button/Button'
const orderSummary = props => 
 {
   
        const ingSummary = Object.keys(props.ingredients).map((igKey) => {
            return (
              <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}> {igKey}</span>:{" "}
                {props.ingredients[igKey]}
              </li>
            );
          });
          return (
            <React.Fragment>
              <h3>You Order</h3>
              <p>A delicious burger with the following ingredients</p>
              <ul>{ingSummary}</ul>
              <p><strong>Total Price: {props.price}</strong></p>
              <p>Continue to Checkout!</p>
              <Button buttonType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
              <Button buttonType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        
            </React.Fragment>
          );
     
 };

export default orderSummary;
