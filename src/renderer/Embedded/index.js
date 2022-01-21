import React from 'react';
import PropTypes from 'prop-types';

const Embed = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, height, width } = entity.getData();

  const isYTBvideo = (url: string) => {
    return url.includes('youtu')
  }

  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
};

const convertYTBUrl = (url: string) => {
    return "https://www.youtube.com/embed/" + getId(url);
};

  return (<iframe height={height} width={width} src={isYTBvideo?convertYTBUrl(src):src} frameBorder="0" allowFullScreen title="Wysiwyg Embedded Content" />);
};

Embed.propTypes = {
  block: PropTypes.object,
  contentState: PropTypes.object,
};

export default Embed;
