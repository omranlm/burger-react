import * as actionType from '../actions/actions'

const initialState ={
    token: null,
    userId:null,
    error: null,
    loading:false,
    authRedirectPath: '/'
}
const reducer = (state = initialState,action) =>{
    switch(action.type)
    {
        case actionType.AUTH_START:
        return {
            ...state,
            loading:true,
            error:null
        }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token:action.token,
                userId: action.userId,
                error:null,
                loading:false
            }
            case actionType.AUTH_FAIL:
                return {
                    ...state,
                    loading:false,
                    error: action.error
                } 
              case actionType.SET_AUTH_REDIRECT:
                return {
                    ...state,
                    authRedirectPath:action.path
                }   
            case actionType.AUTH_LOGOUT:
                return {
                    ...state,
                    token:null,
                    userId: null
                }
        default: return state;
    }
}
export default reducer;

