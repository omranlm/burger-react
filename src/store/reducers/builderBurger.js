import * as actionTypes from '../actions/actions'
import util from '../utility'
const initialState = {
    ingredients: null,
    totalPrice : 4,
    error: false,
    building: false
}

const ING_PRICES = {
    salad: 1.1,
    bacon: 2.2,
    cheese: 3.3,
    meat: 4.4
}


const reducer = (state = initialState,action) =>
{
    switch (action.type)
    {
        case (actionTypes.ADD_INGREDIENT):
        return {
            ...state,
            ingredients:{...state.ingredients, 
                [action.ingredientName]: state.ingredients[[action.ingredientName]] + 1 
            },
            totalPrice: state.totalPrice + ING_PRICES[action.ingredientName],
            building: true
        };

        case (actionTypes.REMOVE_INGREDIENT):

        return {
            ...state,
            ingredients:{...state.ingredients, 
                [action.ingredientName]: state.ingredients[[action.ingredientName]] - 1 
            },
            totalPrice: state.totalPrice - ING_PRICES[action.ingredientName],
            building: true
        }
        case (actionTypes.INIT_INGREDIENT):

            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice : 4,
                building: false,
            }

            case (actionTypes.INIT_INGREDIENT_FAILED):

                return {
                    ...state,
                    error: true
                }
        default:
            return state;
    }

}

export default reducer;