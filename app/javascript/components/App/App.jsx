import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Map from '../Map/Map';
import RestaurantsList from '../RestaurantsList/RestaurantsList';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import { fetchRestaurants } from '../../redux/actions/restaurants';
import { fetchCuisines } from '../../redux/actions/cuisines';
import { CuisineShape, RestaurantShape } from '../../shapes';
import { filterRestaurants } from '../../services/restaurants';

class App extends React.Component {
  static propTypes = {
    fetchRestaurants: PropTypes.func.isRequired,
    fetchCuisines: PropTypes.func.isRequired,
    cuisines: PropTypes.arrayOf(CuisineShape),
    restaurants: PropTypes.arrayOf(RestaurantShape),
  };

  state = {
    filters: {},
    filteredRestaurants: [],
    selectedRestaurant: null,
    modalOpen: false,
  };

  constructor(props) {
    super(props);

    this.props.fetchRestaurants();
    this.props.fetchCuisines();
  }

  componentWillReceiveProps(newProps) {
    this.setState((state) => ({
      filteredRestaurants: filterRestaurants(newProps.restaurants, state.filters),
    }));
  }

  onFiltersChange = (filters) => {
    this.setState((state) => ({
      filters,
      filteredRestaurants: filterRestaurants(this.props.restaurants, filters),
    }));
  };

  onRestaurantClicked = (selectedRestaurant) => {
    this.setState({
      selectedRestaurant,
    });
  };

  toggleAddRestaurantModal = () => {
    this.setState((state) => ({
      modalOpen: !state.modalOpen,
    }));
  };

  render() {
    const { cuisines, restaurants: allRestaurants } = this.props;
    const { filteredRestaurants, selectedRestaurant, modalOpen } = this.state;

    return (
      <div className="container-fluid homepage">
        <Header
          cuisines={cuisines}
          restaurants={allRestaurants}
          onFiltersChange={this.onFiltersChange}
          onAddRestaurantClicked={this.toggleAddRestaurantModal}
          onRestaurantSelected={this.onRestaurantClicked}
        />
        <div className="row">
          <div className="col-4">
            {cuisines.length > 0 && filteredRestaurants.length > 0 &&
            <RestaurantsList
              restaurants={filteredRestaurants}
              cuisines={cuisines}
              onItemClicked={this.onRestaurantClicked}
            />}
          </div>
          <div className="col-8">
            <Map
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
            />
          </div>
        </div>
        <AddRestaurant isOpen={modalOpen} toggle={this.toggleAddRestaurantModal} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants.restaurants,
    cuisines: state.cuisines.cuisines,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRestaurants, fetchCuisines }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
