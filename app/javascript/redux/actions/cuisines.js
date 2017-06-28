export const REQUEST_CUISINES = 'REQUEST_CUISINES';
const requestCuisines = () => {
  return {
    type: REQUEST_CUISINES,
  };
};

export const RECEIVE_CUISINES = 'RECEIVE_CUISINES';
const receiveCuisines = (json) => ({
  type: RECEIVE_CUISINES,
  cuisines: json,
});

export const fetchCuisines = () => {
  return function (dispatch) {
    dispatch(requestCuisines());

    return fetch('/cuisines')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveCuisines(json))
      );
  };
};
