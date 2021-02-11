import React from "react";
import classes from './Input.css';

const input = (props) => {
  let inputElelment = null;

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched)
  {
    inputClasses.push(classes.invalid)
  }
  switch (props.elementType) {
    case ('input'):
      inputElelment = <input 
      className={inputClasses.join(' ')} 
      {...props.elementConfig}
      value={props.value}
       onChange={props.changed}/>;
      break;

      case ('textarea'):
        inputElelment = <textarea 
        className={inputClasses.join(' ')} 
        {...props.elementConfig}
        value={props.value} onChange={props.changed}/>;
        break;

        case ('select'):
            inputElelment = 
            <select 
            className={inputClasses.join(' ')} 
            onChange={props.changed}
            >
                {
                   props.elementConfig.options.map(
                       opt => 
                       (
                           <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                       )
                   )
                }
            </select> 
            // {...props.elementConfig}
            // value={props.value}/>;
            break;
    default:
      inputElelment = <input 
      className={classes.InputElement} 
      {...props.elementConfig}
      value={props.value}/>;
  }

  return <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElelment}
  </div>
};
export default input;
