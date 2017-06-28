import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './styles.scss';
import { CuisineShape, RestaurantShape } from '../../shapes';

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.ratingStars = Array(props.restaurant.rating).fill('⭐');
  }

  onClick = () => {
    this.props.onClick(this.props.restaurant);
  };

  render() {
    const { restaurant, cuisine } = this.props;

    return (
      <div className="row list-item" onClick={this.onClick}>
        <div className="col-1 cuisine">
          <span className="letter" dangerouslySetInnerHTML={{__html: cuisine.symbol}} />
        </div>
        <div className="col-11">
          <div>
            {restaurant.name} {restaurant.accepts_10bis && <span className="tenbis"/>}
          </div>
          <div className="rating">
            <small>Rating: {this.ratingStars}</small>
          </div>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  cuisine: CuisineShape.isRequired,
  restaurant: RestaurantShape.isRequired,
  onClick: PropTypes.func.isRequired,
};

function RestaurantsList({ restaurants, cuisines, onItemClicked }) {
  return (
    <div className="restaurant-list">
      {restaurants && cuisines && restaurants.map((restaurant) =>
        <ListItem
          key={restaurant.id}
          restaurant={restaurant}
          cuisine={_.find(cuisines, (c) => c.id === restaurant.cuisine_id)}
          onClick={onItemClicked}
        />
      )}
    </div>
  );
}

RestaurantsList.propTypes = {
  restaurants: PropTypes.arrayOf(RestaurantShape),
  cuisines: PropTypes.arrayOf(CuisineShape),
  onItemClicked: PropTypes.func.isRequired,
};

export default RestaurantsList;
