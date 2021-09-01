import * as types from "./../consts/index";
export const getMeal = (data) => {
  return {
    type: types.ACTION.GET_MEAL,
    data: data,
  };
};
export const getMealUpdate = (data) => {
  return {
    type: types.ACTION.GET_MEAL_UPDATE,
    data: data,
  };
};
export const getMealDelete = (data) => {
  return {
    type: types.ACTION.GET_MEAL_DELETE,
    data: data,
  };
};