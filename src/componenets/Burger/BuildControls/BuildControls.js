import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const constols = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }, 

];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Total Price {props.price.toFixed(2)}</p>
    {constols.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.added(ctrl.type)}
        removed={() => props.removed(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
      />
    ))}
    <button 
      disabled={!props.purchaseable} 
      className={classes.OrderButton}
      onClick={props.ordered}>
      {props.isAuth ? 'ORDER NOW!' : 'Sign Up to Order'}
    </button>
  </div>
);

export default buildControls;
