import { combineReducers } from 'redux';
import restaurantsReducer from './restaurants';
import cuisinesReducer from './cuisines';

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  cuisines: cuisinesReducer,
});

export default rootReducer;
