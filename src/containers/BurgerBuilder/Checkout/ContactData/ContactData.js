import React, { useState } from "react";
import Button from "../../../../componenets/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../../componenets/UI/Spinner/Spinner";
import axios from "../../../../axios";
import { withRouter } from "react-router";
import Input from "../../../../componenets/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHander from '../../../../hoc/withErrorHandler/withErrorHanlder'
import * as actionCraetor from '../../../../store/actions/index'
const contactData = props => {

  const [orderForm,setOrderForm] = useState ({
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'You Name',
        },
        value: '',
        validation: {
            required: true
        },
        valid:false,
        touched: false,

      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
            required: true
        },
        valid:false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip ',
        },
        value: '',
        validation: {
            required: true,
            minLength : 5
        },
        valid:false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email ',
        },
        value: '',
        validation: {
            required: true
        },
        valid:false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'cheapest',
            },
          ],
        },
        value: 'fastest',
        validation: {
           
        },
        valid:true,
      },
    
   
  })

  const [ formIsValid, setFormIsValid] = useState(false);

  const orderhandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });

    const formData = {};
    
    for(let formElementId in orderForm)
    {
        formData[formElementId] = orderForm[formElementId].value
    }

    const order = {
      ingredients: props.ing,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    };
    props.onOrderBurger(order,props.token)   
  };

  const inputChangeHandler = (event,key) =>
  {
      //console.log('event',event,'key',key);
      const updateOrderForm = {
          ...orderForm
        }
        const updatedFormElement = {...updateOrderForm[key]}
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = checkValidity(updatedFormElement.value,updatedFormElement.validation)
       updatedFormElement.touched = true;
       updateOrderForm[key] = updatedFormElement;
       
       let formIsValid = true;

       for (let inputId in updateOrderForm)
            formIsValid = updateOrderForm[inputId].valid && formIsValid

            setOrderForm(updateOrderForm);
            setFormIsValid(formIsValid)
    
    //  console.log('updateOrderForm',updateOrderForm);
  }
  const checkValidity = (value,rules) =>
  {
    let isValid = true;
    if (rules && rules.required)
    {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules && rules.minLength)
    {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules && rules.maxLength)
    {
        isValid = value.length  <= rules.maxLength && isValid;
    }
    return isValid;
  }
  
    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({ id: key, config: orderForm[key] });
    }
    //console.log('formElementsArray',formElementsArray);
    //console.log('ContactData props', this.props);
    let form = null;
    if (props.loading) {
      form = <Spinner></Spinner>;
    } else {
      form = (
        <form onSubmit={orderhandler}>
            {
            formElementsArray.map(formElement =>
                (
                    <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.value}
                    changed={(event) => inputChangeHandler(event,formElement.id)}
                    invalid={!formElement.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.validation}
                    />
          
                )
                )
            }
          <Button disabled={!formIsValid} buttonType="Success" clicked={orderhandler}>
            ORDER
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data </h4>
        <h3>Price {props.price} </h3>
        {form}
      </div>
    );
  
}

const mapState = state =>
{
  return {
    ing: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatch =  dispatch => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actionCraetor.purchaseBurger(orderData,token))
  }
  
}

export default connect(mapState,mapDispatch)(withRouter(withErrorHander(contactData,axios)));