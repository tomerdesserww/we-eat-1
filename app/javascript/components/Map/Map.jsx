import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import './styles.scss';
import { CuisineShape, RestaurantShape } from '../../shapes';

let mapComponent = null;

const Map = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16}
    center={props.center}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={marker.id}
        {...marker}
      />
    ))}
  </GoogleMap>
)));

function restaurantToMarker(restaurant) {
  const marker = {
    id: restaurant.id,
    position: {
      lat: restaurant.lat,
      lng: restaurant.lng,
    },
    text: restaurant.name,
  };

  return marker;
}

function MapWrapper({ restaurants, selectedRestaurant }) {
  const markers = restaurants.map(restaurantToMarker);
  const { lat, lng } = selectedRestaurant ? selectedRestaurant : { lat: 32.0751692, lng: 34.780883 };

  return (
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyDJJIXPoNVll9kDcjtkVV2XdjZHOC7C7pA"
      loadingElement={<div />}
      center={{ lat, lng }}
      containerElement={ <div className="map_container"/> }
      mapElement={ <div className="map_element" /> }
      onMapLoad={(ref) => {
        mapComponent = ref;
      }}
      onMapClick={_.noop}
      markers={markers}
      onMarkerRightClick={_.noop}
    />
  );
}

MapWrapper.propTypes = {
  restaurants: PropTypes.arrayOf(RestaurantShape),
  selectedRestaurant: RestaurantShape,
};

MapWrapper.defaultProps = {
  restaurants: [],
};

export default MapWrapper;
