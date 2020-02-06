import React from 'react';
import PropTypes from 'prop-types';
import { Icon }from 'semantic-ui-react';

const Chip = ({ tag }) => (
    <span>
        <Icon name='tag' />
        {tag}
    </span>
);
        
Chip.propTypes = {
    tag: PropTypes.string.isRequired
}

export default Chip;