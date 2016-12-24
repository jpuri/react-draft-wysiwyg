import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';

const Image = ({ block }) => {
  const entity = Entity.get(block.getEntityAt(0));
  const { src, height, width } = entity.getData();
  return (<iframe height={height} width={width} src={src} frameBorder="0" allowFullScreen />);
};

Image.propTypes = {
  block: PropTypes.object,
};

export default Image;
