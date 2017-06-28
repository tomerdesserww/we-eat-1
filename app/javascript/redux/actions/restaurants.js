export const REQUEST_FETCH_RESTAURANTS = 'REQUEST_FETCH_RESTAURANTS';
const requestFetchRestaurants = () => ({
  type: REQUEST_FETCH_RESTAURANTS,
});

export const RECEIVE_FETCH_RESTAURANTS = 'RECEIVE_FETCH_RESTAURANTS';
const receiveFetchRestaurants = (restaurants) => ({
  type: RECEIVE_FETCH_RESTAURANTS,
  restaurants,
});

export const fetchRestaurants = () => {
  return function (dispatch) {
    dispatch(requestFetchRestaurants());

    return fetch('/restaurants')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveFetchRestaurants(json))
      );
  };
};

export const REQUEST_ADD_RESTAURANT = 'REQUEST_ADD_RESTAURANT';
const requestAddRestaurant = (restaurant) => ({
  type: REQUEST_ADD_RESTAURANT,
  restaurant,
});

export const RECEIVE_ADD_RESTAURANT = 'RECEIVE_ADD_RESTAURANT';
const receiveAddRestaurant = (restaurant) => ({
  type: RECEIVE_ADD_RESTAURANT,
  restaurant,
});

export const addRestaurant = (restaurant) => {
  return function (dispatch) {
    dispatch(requestAddRestaurant(restaurant));

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return fetch('/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurant),
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveAddRestaurant(json))
      );
  };
};
