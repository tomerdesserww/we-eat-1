import PropTypes from 'prop-types';

export const CuisineShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const RestaurantShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  cuisine_id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  accepts_10bis: PropTypes.bool.isRequired,
  max_delivery_time_minutes: PropTypes.number.isRequired,
});
