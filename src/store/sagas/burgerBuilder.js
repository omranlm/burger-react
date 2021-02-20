import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios";

export function* initIngSaga(action) {
  try {
    const response = yield axios.get("/ingredients.json");
    yield put(actions.setIng(response.data));
  } catch (error) {
    yield put(actions.fetchIngFailed());
  }
}
