import React, { Component } from 'react';
import Order from '../../componenets/Order/Order';
import axios from '../../axios'
import Spinner from '../../componenets/UI/Spinner/Spinner'
import * as actionCraetor from '../../store/actions/index'
import withErrorHander from '../../hoc/withErrorHandler/withErrorHanlder'
import { connect } from 'react-redux';
class Orders extends Component
{
    state = 
    {
        orders:null,
        loading: true
    }
    componentDidMount()
    {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render()
    { 
        let orders = <Spinner></Spinner>;
        console.log('render this.props',this.props);
        if(!this.props.loading)
        {
            orders= this.props.ordersList.map(order=>
                ( 
                    <Order key={order.id} order={order}/>
                ));
        }
     //  
    
        return (
            <div>
               {orders}
            </div>
        );

    }
}

const mapProps = state =>
{
    console.log('mapProps state', state);
    return {
        ordersList: state.order.orders,
        loading:  state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispaotch = dispatch =>
{
    return {
        onFetchOrders: (token,userId)=> dispatch(actionCraetor.fetchOrders(token,userId))
    }
}
export default connect(mapProps,mapDispaotch)(withErrorHander(Orders,axios));