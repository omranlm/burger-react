import {put, call} from 'redux-saga/effects';
import * as actions from '../actions/index';
import {delay} from 'redux-saga/effects'
import axios from '../../axios';
export function* logoutSaga(action){
   
   yield call([localStorage,'removeItem'],"token")
   yield call([localStorage,'removeItem'],"expirationDate")
   yield call([localStorage,'removeItem'],"userId")
//    yield localStorage.removeItem('token');
//    yield localStorage.removeItem('expirationDate');
//    yield localStorage.removeItem('userId');
   yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action)
{
    yield delay(action.expirationTime *1000);
    yield put(actions.logout());

}

export function* AuthUserSaga (action)
{
    yield put (actions.authStart());
    const authData = {
              email: action.email,
              password: action.password,
              returnSecureToken: true,
            };

            let url = "";
    if (action.isSignup)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1b6peeNGLwjJWGkKlMeJPgf-DOQPySCw";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1b6peeNGLwjJWGkKlMeJPgf-DOQPySCw";

    try {
    const response = yield axios.post(url, authData);
      
        // console.log("response", response);
        yield localStorage.setItem('token',response.data.idToken);
        const expirationDate = yield new Date(new Date ().getTime() + response.data.expiresIn*100);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield localStorage.setItem('userId',response.data.localId);
        
        yield put(actions.authSuccess(response.data));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
     catch(err) {
        yield put(actions.authFail(err.response.data.error));
      }
}
export function* authCheckStateSaga (action)
{
    const token= yield localStorage.getItem('token');
    if (!token)
    {
        yield put(actions.logout());            
    }
    else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate')) 
        if (expirationDate <= new Date())
        {
            yield put(actions.logout()); 
        }
        else {
            const userId=localStorage.getItem('userId');
   
            yield put(actions.authSuccess({
            idToken: token,
            localId: userId
        }));

        yield put(actions.checkAuthTimeout(expirationDate.getTime()-new Date().getTime()));
    }
    }
}