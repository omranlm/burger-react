import { connect } from "react-redux";
import * as actionTypes from "./actions";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const checkAuthTimeout = (expirationTime) => {

    return dispatch =>
    {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime*1000)
    }
};

export const logout = () =>
{   
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
      
      };
}
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    //...
    console.log("dispatch", dispatch);
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url = "";
    if (isSignup)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1b6peeNGLwjJWGkKlMeJPgf-DOQPySCw";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1b6peeNGLwjJWGkKlMeJPgf-DOQPySCw";

    axios
      .post(url, authData)
      .then((response) => {
        console.log("response", response);
        localStorage.setItem('token',response.data.idToken);
        const expirationDate = new Date(new Date ().getTime() + response.data.expiresIn*100);
        localStorage.setItem('expirationDate',expirationDate);

        localStorage.setItem('userId',response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log('err',err);
        dispatch(authFail(err.response.data.error));
      })
      .finally(() => {
        console.log("finally");
      });
  };
};

export const setAuthRedirect = (path) =>
{
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}

export const authCheckState = () =>{
    return dispatch => {
        console.log('authCheckState()')
        const token=localStorage.getItem('token');
        if (!token)
        {
            dispatch(logout());            
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')) 
            if (expirationDate <= new Date())
            {
                dispatch(logout()); 
            }
            else {
                const userId=localStorage.getItem('userId');
       
            dispatch(authSuccess({
                idToken: token,
                localId: userId
            }));

            dispatch(checkAuthTimeout(expirationDate.getTime()-new Date().getTime()));
        }
        }
    }
}

