import * as actionTypes from './actions'
import axios from '../../axios'
import order from '../../componenets/Order/Order'
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
    return dispatch =>
    {
        dispatch(purchaseBurgerStart());
        axios
        .post('/orders.json?auth='+ token, orderData)
        .then((response) => {
      
            console.log('response.data ',response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch((error) => {
        //   this.setState({
        //     loading: false,
        //     purchasing: false,
        //   });
        dispatch(purchaseBurgerFailed(error))

        })
        .finally();
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

    
    return dispatch =>
    {
        console.log('token',token);
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(
            (response)=>
            {
                 const orders=[];
                for (let key in response.data)
                {
                    orders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                console.log('orders',orders);
               
               dispatch(fetchOrdersSuccess(orders))
            }
        )
        .catch((error)=>
        {
            dispatch(fetchOrdersFail(error))
          
        });
    }
}
export const fetchOrdersStart = () =>{

  
    return {
        type: actionTypes.FETCH_ORDERS_START,
        
    }

}