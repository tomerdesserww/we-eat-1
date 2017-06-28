import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Modal, ModalHeader, ModalBody, Form, Input, Button, FormGroup, Label } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import CuisineSelect from '../Shared/CuisineSelect';
import RatingSelect from '../Shared/RatingSelect';
import DeliveryTimeSelect from '../Shared/DeliveryTimeSelect';
import { addRestaurant } from '../../redux/actions/restaurants';
import { CuisineShape } from '../../shapes';

class AddRestaurant extends React.Component {
  static propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    cuisines: PropTypes.arrayOf(CuisineShape),
  };

  state = {
    restaurant: {
      name: '',
      address: '',
      cuisine_id: null,
      rating: null,
      max_delivery_time_minutes: null,
      accepts_10bis: false,
    },
    valid: false,
  };

  onSubmit = async () => {
    const results = await geocodeByAddress(this.state.restaurant.address);
    const location = results[0].geometry.location;
    const restaurant = {
      ...this.state.restaurant,
      lat: location.lat(),
      lng: location.lng(),
    };

    this.props.addRestaurant(restaurant);
    this.props.toggle();
  };

  onChange = (field) => ({ target: { value } }) => {
    this.setState((state) => ({
      restaurant: {
        ...state.restaurant,
        [field]: _.isNumber(value) ? Number(value) : value,
      },
    }));
  };

  isValid = () => {
    return Object.values(this.state.restaurant).every((val) => val !== null && val !== '');
  };

  onNameChanged = this.onChange('name');
  onCuisineChanged = this.onChange('cuisine_id');
  onRatingChanged = this.onChange('rating');
  onDeliveryTimeChanged = this.onChange('max_delivery_time_minutes');
  onAccepts10bisChanged = this.onChange('accepts_10bis');

  onAddressChanged = (address) => {
    this.setState((state) => ({
      restaurant: {
        ...state.restaurant,
        address,
      },
    }));
  }

  render() {
    const { isOpen, toggle, cuisines } = this.props;
    const saveDisabled = !this.isValid();

    return (
      <Modal isOpen={isOpen} toggle={toggle} backdrop>
        <ModalHeader>Add Restaurant</ModalHeader>

        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Restaurant Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name..." onChange={this.onNameChanged}/>
            </FormGroup>
            <FormGroup>
              <Label for="name">Address</Label>
              <PlacesAutocomplete
                inputProps={{
                  onChange: this.onAddressChanged,
                  value: this.state.restaurant.address,
                  placeholder: 'Address..',
                }}
                classNames={{
                  input: 'form-control',
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cuisine_select">Cuisine Type</Label>
              <CuisineSelect cuisines={cuisines} onChange={this.onCuisineChanged}/>
            </FormGroup>
            <FormGroup>
              <Label for="rating_select">Rating</Label>
              <RatingSelect onChange={this.onRatingChanged}/>
            </FormGroup>
            <FormGroup>
              <Label for="delivery_time_select">Speed</Label>
              <DeliveryTimeSelect onChange={this.onDeliveryTimeChanged}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={this.onAccepts10bisChanged}/> Accepts 10bis
              </Label>
            </FormGroup>
          </Form>

          <div className="text-center">
            <Button type="submit" disabled={saveDisabled} color="danger" size="lg" onClick={this.onSubmit}>Save</Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    cuisines: state.cuisines.cuisines,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRestaurant }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);
