import * as actionTypes from '../actions/actions';

const initialState = {
    orders:[],
    loading:false,
    purchased:false
}
const reducer = (state = initialState,action) =>
{
    switch (action.type)
    {
        case actionTypes.PURCHASEB_INIT:
            return{
                ...state,
                purchased:false,

            }   
        case actionTypes.PURCHASEB_BURGER_Start:
            return{
                ...state,
                loading:true,

            }   

        case actionTypes.PURCHASEB_BURGER_SUCCESS:
            const newOrder ={
                ...action.orderData,
                id: action.orderId
            }
        return{
            ...state,
            loading:false,
            orders:state.orders.concat(newOrder),
            purchased:true
        };

        case actionTypes.PURCHASEB_BURGER_FAILED:
        return{
            ...state,
            loading: false
        };

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
            case actionTypes.FETCH_ORDERS_SUCCESS:
                console.log('FETCH_ORDERS_SUCCESS', action)
                return {
                    ...state,
                    orders: [...action.orders],
                    loading: false
                }

                case actionTypes.FETCH_ORDERS_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: action.error
                    }
        default:
            return state;
    }
}

export default reducer;