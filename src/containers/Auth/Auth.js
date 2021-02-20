import React, { Component, useEffect, useState } from 'react';
import Input from '../../componenets/UI/Input/Input';
import Button from '../../componenets/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreator from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../componenets/UI/Spinner/Spinner'
import { Redirect } from 'react-router';
const auth = props => 
{
  const [authForm, setAuthForm] = useState ({
            email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail : true,
                },
                valid:false,
                touched: false,
        
              },
            password: {
                elementType: 'input',
                elementConfig: {
                  type: 'password',
                  placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength : 6,
                },
                valid:false,
                touched: false,
        
              },
        })
        
    const [inSignUp, setInSignUp] = useState(true);
    
    const {building, authRedirectPath,onSetAuthRedirectPath} = props;
    useEffect(() => {
        if(!building && authRedirectPath !== '/')
        onSetAuthRedirectPath();
        return () => {
            
        }
    }, [building, authRedirectPath,onSetAuthRedirectPath])
 
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
  

  
  const inputChangeHandler = (event,controlName) =>
  {
      const updatedControls = {
          ...authForm,
          [controlName]: {
            ...authForm[controlName],
            value: event.target.value,
            valid: checkValidity(event.target.value, authForm[controlName].validation),
            touched: true
          }
      }
      setAuthForm(updatedControls)
  }
  const submitHandler = (event) =>
  {
    event.preventDefault();
    props.onAuth(authForm.email.value,authForm.password.value,inSignUp)
  }
  const switchAuthModeHandler = (event) =>
  {
    event.preventDefault();
   
    setInSignUp(!inSignUp)      
  }
   
        //console.log('Auth props', props);
        const formElementsArray = [];
        for (let key in authForm) {
          formElementsArray.push({ 
              id: key, 
              config: authForm[key] });
        }

        let  form = formElementsArray.map(formElement => (
            <Input key={formElement.id} 
          
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.value}
            changed={(event) => inputChangeHandler(event,formElement.id)}
            invalid={!formElement.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.validation}/>
        ))
        if(props.loading)
            form = <Spinner></Spinner>

            let  errorMessag = null;

            if (props.error)
            {
                errorMessag = (
                    <p>{props.error.message}</p>
                )
            }


            
        return (
            <div className={classes.Auth}>
               
                {props.isAuth ? 
                
                (<Redirect to={props.authRedirectPath}/>) :
                
                null}

                 {errorMessag}
                <form onSubmit={submitHandler} > 
                    {form}
                    <Button buttonType="Success" >{inSignUp ? 'Sign Up': 'Sign In'}</Button>
                    <Button buttonType="Danger" clicked={switchAuthModeHandler} >Switch to Sign In</Button>
                   
                </form>
            </div>
        );

    
}
const mapProps = state =>
{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !==null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}
const mapDispatch = dispatch =>
{
    return{
        onAuth: (email,password,isSignup) => dispatch(actionCreator.auth(email,password,isSignup)),
        onSetAuthRedirectPath: ()=>dispatch(actionCreator.setAuthRedirect('/'))
    }
}
export default connect(mapProps,mapDispatch)(auth);