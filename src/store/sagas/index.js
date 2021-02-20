import { logoutSaga, 
    checkAuthTimeoutSaga,
    AuthUserSaga,
    authCheckStateSaga } from './auth';
import { initIngSaga } from './burgerBuilder';
import { purchaseBurgerSaga ,fetchOrdersSaga} from './order';
import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actions'

 export function* watchAuth ()
 {
     yield all ([
         
      takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
      takeEvery(actionTypes.AUTH_CHECKTIMEOUT,checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH_USER,AuthUserSaga),
      takeEvery(actionTypes.AUTH_AUTO_LOGIN,authCheckStateSaga),
      takeEvery(actionTypes.BURGER_INIT,initIngSaga),
     ]);
 }

 export function* watchBurgerBuilder ()
 {
    yield takeEvery(actionTypes.BURGER_INIT,initIngSaga);
   
 }

 
 export function* watchOrder ()
 {
    yield takeLatest(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga);
 }