
import * as actionTypes from "./actions";
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

    return {
      type: actionTypes.AUTH_CHECKTIMEOUT,
      expirationTime: expirationTime
    }
};

export const logout = () =>
{   
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
      
      };
}
export const logoutSucceed = () =>
{   
  return {
      type: actionTypes.AUTH_LOGOUT,      
    };
}
export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email:email,
    password:password,
    isSignup:isSignup,
  }
};
export const setAuthRedirect = (path) =>
{
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}

export const authCheckState = () =>{
    return {
      type: actionTypes.AUTH_AUTO_LOGIN,
    }
}

