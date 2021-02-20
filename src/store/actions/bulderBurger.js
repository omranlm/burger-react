import * as actionType from "./actions";

export const addIngredient = (name) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIng = (ingredients) => {
  return {
    type: actionType.INIT_INGREDIENT,
    ingredients: ingredients,
  };
};
export const fetchIngFailed = () => {
  return {
    type: actionType.INIT_INGREDIENT_FAILED,
    error: true,
  };
};
export const initIng = () => {
  return {
    type: actionType.BURGER_INIT
  }
};
