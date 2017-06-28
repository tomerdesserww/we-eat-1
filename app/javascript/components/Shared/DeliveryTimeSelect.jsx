import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

function DeliveryTimeSelect({ onChange, defaultLabel }) {
  return (
    <Input type="select" id="delivery_time_select" className="filter" onChange={onChange} defaultValue="">
      <option value="">{defaultLabel}</option>
      <option value="30">Up to 30 minutes</option>
      <option value="45">Up to 45 minutes</option>
      <option value="60">Up to 1 hour</option>
      <option value="90">Up to 1.5 hours</option>
      <option value="120">Up to 2 hours</option>
    </Input>
  );
}

DeliveryTimeSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string,
};

DeliveryTimeSelect.defaultProps = {
  defaultLabel: 'Choose one…',
};

export default DeliveryTimeSelect;
