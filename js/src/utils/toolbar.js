/* @flow */

import { forEach, isMap } from './common';

/**
* This function is used when displaying options in drop-down.
* Icon for first available options is used in drop-down placeholder.
*/
const getFirstIcon = config => config[config.options[0]].icon;

/**
* The function is used to recursively merge toolbar options.
* It assumes all the options are peresent in obj1.
* It recursively merges objects but not arrays.
*/
const mergeRecursive = (obj1, obj2) => {
  if (obj1 && obj2 === undefined) {
    return obj1;
  }
  const mergedValue = {};
  forEach(obj1, (key, value) => {
    if (isMap(value)) {
      mergedValue[key] = mergeRecursive(value, obj2[key]);
    } else {
      mergedValue[key] = obj2[key] !== undefined ? obj2[key] : value;
    }
  });
  return mergedValue;
};

module.exports = {
  getFirstIcon,
  mergeRecursive,
};

// todo: writing test cases for these methods and new methods added in common.js
