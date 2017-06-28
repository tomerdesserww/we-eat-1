import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Typeahead } from 'react-bootstrap-typeahead';
import CuisineSelect from '../Shared/CuisineSelect';
import RatingSelect from '../Shared/RatingSelect';
import DeliveryTimeSelect from '../Shared/DeliveryTimeSelect';
import { CuisineShape, RestaurantShape } from '../../shapes';
import './styles.scss';

function SearchBar({ restaurants, onSelect }) {
  return (
    <div className="searchbar">
      <span className="icon"/>
      <Typeahead
        style={{ borderWidth: 0 }}
        labelKey={'name'}
        placeholder="Find a restaurant"
        className="input"
        onChange={(e) => {
          onSelect(e[0]);
        }}
        options={restaurants}
      />
    </div>
  );
}

SearchBar.propTypes = {
  restaurants: PropTypes.arrayOf(RestaurantShape).isRequired,
  onSelect: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  restaurants: [],
};

class FiltersBar extends React.Component {
  static propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    cuisines: PropTypes.arrayOf(CuisineShape).isRequired,
  }

  state = {
    cuisineId: null,
    minMating: null,
    maxDeliveryMin: null,
  }

  static defaultProps = {
    cuisines: [],
    onFiltersChange: _.noop,
  };

  onFilterSelected = (filterName) => (e) => {
    this.setState({
      [filterName]: e.target.value === '' ? null : Number(e.target.value),
    }, () => this.props.onFiltersChange(this.state));
  };

  onCuisineSelected = this.onFilterSelected('cuisineId')
  onRatingSelected = this.onFilterSelected('minRating')
  onDeliveryTimeSelected = this.onFilterSelected('maxDeliveryMin')

  render() {
    const { cuisines } = this.props;

    return (
      <div className="row filters">
        <div className="col-4">
          <div>Cuisine</div>
          <CuisineSelect
            cuisines={cuisines}
            onChange={this.onCuisineSelected}
            defaultLabel={`${_.take(cuisines, 3).map((c) => c.name).join(', ')}…`}
          />
        </div>
        <div className="col-4">
          <div>Rating</div>
          <RatingSelect
            onChange={this.onRatingSelected}
            defaultLabel="How many stars…"
          />
        </div>
        <div className="col-4">
          <div>Speed</div>
          <DeliveryTimeSelect
            onChange={this.onDeliveryTimeSelected}
            defaultLabel="How long will it be…"
          />
        </div>
      </div>
    );
  }
}

function Header({ restaurants, cuisines, onFiltersChange, onAddRestaurantClicked, onRestaurantSelected }) {
  return (
    <div className="row align-items-center justify-content-center header">
      <div className="col-12">
        <div className="title">WeEat</div>
        <div className="subtitle">It's 12:00 and you're hungry</div>
        <SearchBar restaurants={restaurants} onSelect={onRestaurantSelected}/>
        <FiltersBar cuisines={cuisines} onFiltersChange={onFiltersChange}/>
      </div>
      <a onClick={onAddRestaurantClicked} className="addButton"/>
    </div>
  );
}

Header.propTypes = {
  cuisines: PropTypes.arrayOf(CuisineShape),
  restaurants: PropTypes.arrayOf(RestaurantShape),
  onFiltersChange: PropTypes.func.isRequired,
  onAddRestaurantClicked: PropTypes.func.isRequired,
  onRestaurantSelected: PropTypes.func.isRequired,
};

Header.defaultProps = {
  cuisines: [],
  restaurants: [],
}

export default Header;
