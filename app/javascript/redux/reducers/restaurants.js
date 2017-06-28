import { RECEIVE_FETCH_RESTAURANTS, RECEIVE_ADD_RESTAURANT } from '../actions/restaurants';

export default function RestaurantsReducer(state = { restaurants: [] }, action) {
  switch (action.type) {
  case RECEIVE_FETCH_RESTAURANTS:
    return {
      ...state,
      restaurants: action.restaurants,
    };
  case RECEIVE_ADD_RESTAURANT:
    return {
      ...state,
      restaurants: state.restaurants.concat(action.restaurant),
    };
  default:
    return state;
  }
};
