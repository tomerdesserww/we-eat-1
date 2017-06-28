import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

function RatingSelect({ onChange, defaultLabel }) {
  return (
    <Input
      type="select"
      id="rating_select"
      className="filter"
      onChange={onChange} defaultValue=""
    >
      <option value="">{defaultLabel}</option>
      {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating}</option>)}
    </Input>
  );
}

RatingSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string,
};

RatingSelect.defaultProps = {
  defaultLabel: 'Choose one…',
};

export default RatingSelect;
