import React, { Component } from 'react';
import Button from '../../../../componenets/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../../componenets/UI/Spinner/Spinner'
import axios from '../../../../axios';
import { withRouter } from 'react-router';
class ContactData extends Component
{
    state =
    {
        name:'',
        email:'',
        address: {
            street:'',
            postalCode: ''
        }
    }

    orderhandler = (event) =>
    {
        event.preventDefault();
        this.setState({loading:true})
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        customer : {
            name: 'Omran',
            address:{
                street: 'street'
            },
            email: 'omran@gmail.com'

        }
    };
    axios.post('/orders.json',order)
    .then(response => {
        this.setState({
            loading:false})
            this.props.history.push('/');
    })
    .catch(error =>
        {
            this.setState(
                {
                    loading:false,
                    purchasing:false})
            console.log(error);
        })
        .finally();
    }
    render ()
    {
        console.log('ContactData props',this.props)
        let form = null;
        if (this.state.loading)
        {
            form = <Spinner></Spinner>
        }
        else
        {
            form =<form>
            <input className={classes.Input} type="text" name="name" placeholder="You Name"></input>
            <input className={classes.Input} type="email" name="email" placeholder="You email"></input>
            <input className={classes.Input} type="text" name="street" placeholder="You street"></input>
            <input className={classes.Input} type="text" name="postalCode" placeholder="You Zip Code"></input>

            <Button buttonType="Success"
            clicked={this.orderhandler}>ORDER</Button>
        </form>;
        }
        return (
            
            <div className={classes.ContactData}>
                <h4>Enter your contact data </h4>
                <h3>Price {this.props.price} </h3>
                {form}
            </div>
        );

    }
}
export default withRouter(ContactData);
