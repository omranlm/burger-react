import React, { Component, useEffect } from 'react';
import Order from '../../componenets/Order/Order';
import axios from '../../axios'
import Spinner from '../../componenets/UI/Spinner/Spinner'
import * as actionCraetor from '../../store/actions/index'
import withErrorHander from '../../hoc/withErrorHandler/withErrorHanlder'
import { connect } from 'react-redux';
const orders = props => 
{
    const 
    state = 
    {
        orders:null,
        loading: true
    }
    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(props.token,props.userId);
        return () => {
            
        }
    }, [onFetchOrders])
       
        
        let orders = <Spinner></Spinner>;
        //console.log('render this.props',this.props);
        if(!props.loading)
        {
            orders= props.ordersList.map(order=>
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

const mapProps = state =>
{
    // console.log('mapProps state', state);
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
export default connect(mapProps,mapDispaotch)(withErrorHander(orders,axios));