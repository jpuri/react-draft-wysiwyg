import React from 'react';
import PropTypes from 'prop-types';

function Icon({ src, ...props }) {
  if (typeof src === 'function') {
    return src(props);
  }

  return <img src={src} alt="" {...props} />;
}

Icon.propTypes = {
  src: PropTypes.oneOf([PropTypes.func, PropTypes.string]),
};

export default Icon;
