import PropTypes from 'prop-types';

const textDecorationShape = {
  title: PropTypes.string,
  label: PropTypes.string,
};

const imageShape = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  uploadCallback: PropTypes.func,
  defaultSize: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string,
  })
};

const linkShape = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
};

export const toolbarShape = PropTypes.shape({
  textDecoration: PropTypes.shape({
    max: PropTypes.number,
    bold: PropTypes.shape(textDecorationShape),
    italic: PropTypes.shape(textDecorationShape),
    underline: PropTypes.shape(textDecorationShape),
    strikethrough: PropTypes.shape(textDecorationShape),
  }),
  colorPicker: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string)
  }),
  insert: PropTypes.shape({
    max: PropTypes.number,
    image: PropTypes.shape(imageShape),
    link: PropTypes.shape(linkShape)
  })
});
