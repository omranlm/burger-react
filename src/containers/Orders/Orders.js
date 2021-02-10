import React, { Component } from 'react';
import Order from '../../componenets/Order/Order';
import axios from '../../axios'
import Spinner from '../../componenets/UI/Spinner/Spinner'

import withErrorHander from '../../hoc/withErrorHandler/withErrorHanlder'
class Orders extends Component
{
    state = 
    {
        orders:null,
        loading: true
    }
    componentDidMount()
    {
        axios.get('/orders.json')
        .then(
            (response)=>
            {
                 const orders=[];
                for (let key in response.data)
                {
                    orders.push({
                        ...response.data[key],
                        key: key
                    })
                }
                console.log('orders',orders);
               
                this.setState({orders: orders,
                loading:false})
            }
        )
        .catch((error)=>
        {
            this.setState({
                loading:false})
        });
    }
    render()
    {
        let orders = <Spinner></Spinner>;
        if (this.state.orders)
             orders = this.state.orders.map(order=>
                ( <Order key={order.key} order={order}/>
                    ));
        return (
            <div>
               {orders}
            </div>
        );

    }
}
export default withErrorHander(Orders,axios);