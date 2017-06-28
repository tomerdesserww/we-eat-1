import { RECEIVE_CUISINES } from '../actions/cuisines';

export default function CuisinesReducer(state = { cuisines: [] }, action) {
  switch (action.type) {
  case RECEIVE_CUISINES:
    return {
      ...state,
      cuisines: action.cuisines,
    };
  default:
    return state;
  }
};
