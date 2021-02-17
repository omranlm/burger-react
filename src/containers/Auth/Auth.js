import React, { Component } from 'react';
import Input from '../../componenets/UI/Input/Input';
import Button from '../../componenets/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreator from '../../store/actions/index'
import { connect } from 'react-redux';
import { setIng } from '../../store/actions/bulderBurger';
import Spinner from '../../componenets/UI/Spinner/Spinner'
import { Redirect } from 'react-router';
class Auth extends Component
{

    state = {
        controls: {
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
        },
        inSignUp: true
    }

    checkValidity = (value,rules) =>
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
  

  componentDidMount()
  {
      if(!this.props.building && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
  }
  
  inputChangeHandler = (event,controlName) =>
  {
      const updatedControls = {
          ...this.state.controls,
          [controlName]: {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
          }
      }
      this.setState({controls:updatedControls})
  }
  submitHandler = (event) =>
  {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.inSignUp)
  }
  switchAuthModeHandler = (event) =>
  {
    event.preventDefault();
   
      this.setState(prevState =>
        {
            return {
                inSignUp: !prevState.inSignUp
            }
        })
  }
    render()
    {
        //console.log('Auth props', this.props);
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({ 
              id: key, 
              config: this.state.controls[key] });
        }

        let  form = formElementsArray.map(formElement => (
            <Input key={formElement.id} 
          
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.value}
            changed={(event) => this.inputChangeHandler(event,formElement.id)}
            invalid={!formElement.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.validation}/>
        ))
        if(this.props.loading)
            form = <Spinner></Spinner>

            let  errorMessag = null;

            if (this.props.error)
            {
                errorMessag = (
                    <p>{this.props.error.message}</p>
                )
            }


            
        return (
            <div className={classes.Auth}>
               
                {this.props.isAuth ? 
                
                (<Redirect to={this.props.authRedirectPath}/>) :
                
                null}

                 {errorMessag}
                <form onSubmit={this.submitHandler} > 
                    {form}
                    <Button buttonType="Success" >{this.state.inSignUp ? 'Sign Up': 'Sign In'}</Button>
                    <Button buttonType="Danger" clicked={this.switchAuthModeHandler} >Switch to Sign In</Button>
                   
                </form>
            </div>
        );

    }
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
export default connect(mapProps,mapDispatch)(Auth);