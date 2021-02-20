import * as actionTypes from './actions'
import axios from '../../axios'
export const purchaseBurgerSuccess = (id,orderData) =>
{
    return {
        type: actionTypes.PURCHASEB_BURGER_SUCCESS,
        orderId:id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) =>
{
    return {
        type: actionTypes.PURCHASEB_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart =() =>
{
    return {
        type: actionTypes.PURCHASEB_BURGER_Start,      
    }
}
export const purchaseBurger = (orderData,token) =>
{
    return{
        type: actionTypes.PURCHASE_BURGER,
        orderData:orderData,
        token:token,
    }
}

export const purchaseInit = () =>{

    return {
        type: actionTypes.PURCHASEB_INIT
    }

}

export const fetchOrdersSuccess = (orders) =>{

    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }

}

export const fetchOrdersFail = (error) =>{

    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }

}

export const fetchOrders = (token,userId) =>{

    return {
        type: actionTypes.FETCH_ORDERS,
        token:token,
        userId:userId

    }
}
export const fetchOrdersStart = () =>{

  
    return {
        type: actionTypes.FETCH_ORDERS_START,
        
    }

}