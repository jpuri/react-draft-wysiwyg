import React from 'react';
import PropTypes from 'prop-types';

const Code = ({
  blockProps,
}) => (
  <h5
    contentEditable={false}
    readOnly
  >
    {`</> ${blockProps.codeTranslation}`}
  </h5>
);

Code.propTypes = {
  blockProps: PropTypes.object.isRequired,
};

export default Code;
