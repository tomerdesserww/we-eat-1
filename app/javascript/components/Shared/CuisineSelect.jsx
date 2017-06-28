import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { CuisineShape } from '../../shapes';

function CuisineSelect({ cuisines, onChange, defaultLabel }) {
  return (
    <Input
      type="select"
      id="cuisine_select"
      className="filter"
      onChange={onChange}
      defaultValue=""
    >
      <option value="">{defaultLabel}</option>
      {cuisines.map((cuisine) => <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>)}
    </Input>
  );
}

CuisineSelect.propTypes = {
  cuisines: PropTypes.arrayOf(CuisineShape).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string,
};

CuisineSelect.defaultProps = {
  cuisines: [],
  defaultLabel: 'Choose one…',
};

export default CuisineSelect;
