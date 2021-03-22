import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';
import { FormGroup } from 'react-bootstrap';

function VisibilityFilterInput(props) {
  return <div className="visibility-filter-input">
    <FormGroup controlId="formBasicFilterInput" className="mb-4">
        <Form.Control
        className="search"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search by title..."
        />
    </FormGroup>
</div>

}

export default connect(null, { setFilter })(VisibilityFilterInput);