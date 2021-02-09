import React, { Component, Fragment } from 'react'
import Burger from '../../componenets/Burger/Burger';
import BuildControls from '../../componenets/Burger/BuildControls/BuildControls';
import Modal from '../../componenets/UI/Modal/Modal';
import OrderSummary from "../../componenets/Burger/OrderSummary/OrderSummary";
import Spinner from '../../componenets/UI/Spinner/Spinner'
import axios from '../../axios';
import withErrorHander from '../../hoc/withErrorHandler/withErrorHanlder'
const ING_PRICES = {
    salad: 1.1,
    bacon: 2.2,
    cheese: 3.3,
    meat: 4.4
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            totalPrice: 4,
            purchaseable:false,
            purchasing:false,
            loading: false,
            error: false
        }
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response=>
            {
                this.setState({ingredients: response.data});
            })
            .catch(error=>
                {
                    this.setState({error: true});
          
                })
    }
    addIngredientHandler = (type) => {
       
        this.setState(prevState => {
            const oldCount = prevState.ingredients[type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = { ...prevState.ingredients };
            updatedIngredients[type] = updatedCount;
            const newPrice = ING_PRICES[type];
            this.updatePurchaseState(updatedIngredients);
            return{
                ingredients: updatedIngredients,
                totalPrice: prevState.totalPrice + newPrice  
            }
        });
        
    }
  removedIngredientHandler = (type) => {

       
        this.setState(prevState=>
            { const oldCount = prevState.ingredients[type];
                if (oldCount <= 0) return;
                const updatedCount = oldCount - 1;
                const updatedIngredients = { ...prevState.ingredients };
                updatedIngredients[type] = updatedCount;
                const newPrice = ING_PRICES[type];

                this.updatePurchaseState(updatedIngredients);
                return {
                    ingredients: updatedIngredients,
                    totalPrice: prevState.totalPrice - newPrice
                }
            });
        
    }
    updatePurchaseState (ingredients)
    {
        const sum = Object.keys(ingredients).map((igKey)=>
        {
            return ingredients[igKey];
        }).reduce((sum,el) =>
        {
            return sum + el;
        },0);
        this.setState({purchaseable : sum > 0});
    }
    purchaseHandler = () =>
    {
        this.setState({purchasing:true});
    }
    modalClosedhandler = () =>
    {
        this.setState({purchasing:false});
    } 
    purchaseContinuehandler = () =>
    {
        //alert('you continue!')
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                loading:false,
                purchasing:false})
      
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
    render() {
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo )
        {
            disabledInfo[key] = disabledInfo[key]  <=0;
        }

      

        let  orderSummary = null;
        let burger = this.state.erre ? <p>App is not avialble</p> : <Spinner></Spinner> 
        
        if (this.state.ingredients){
        burger = <Fragment>
            <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                added={this.addIngredientHandler} 
                removed={this.removedIngredientHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}/>
        </Fragment>;
          orderSummary =  <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCanceled={this.modalClosedhandler}
          purchaseContinue={this.purchaseContinuehandler}
          price={this.state.totalPrice}
           ></OrderSummary>;
}
if (this.state.loading)
orderSummary = <Spinner />

        
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.modalClosedhandler}> 
                   {orderSummary}
                </Modal>
                {burger}

            </React.Fragment>
        );
    }

}

export default withErrorHander(BurgerBuilder,axios);