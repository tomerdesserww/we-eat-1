export function filterRestaurants(restaurants, filters) {
  const { cuisineId, minRating, maxDeliveryMin } = filters;
  return restaurants.filter((restaurant) =>
    (!cuisineId || restaurant.cuisine_id === cuisineId) &&
    (!minRating || restaurant.rating >= minRating) &&
    (!maxDeliveryMin || restaurant.max_delivery_time_minutes <= maxDeliveryMin)
  );
}
