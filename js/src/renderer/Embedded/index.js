import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';

const Image = ({ block }) => {
  const entity = Entity.get(block.getEntityAt(0));
  const { link } = entity.getData();
  return (<iframe width="100%" height="315px" src={link} frameBorder="0" allowFullScreen />);
};

Image.propTypes = {
  block: PropTypes.object,
};

export default Image;
