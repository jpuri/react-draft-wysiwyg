module.exports = {
  getFirstIcon: config => config.get(config.get('options').first()).get('icon'),
};

// todo:
// icons should have same size
// image upload shoul need fn to be present
