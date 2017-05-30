import { assert } from 'chai';
import { spy } from 'sinon';
import { forEach, size } from '../common';

describe('forEach test suite', () => {
  const obj = {
    1: 1,
    2: 2,
    3: 3,
  };
  const callback = spy();
  it('should return without calling callback for undefined objects', () => {
    forEach(undefined, callback);
    assert.equal(callback.callCount, 0);
    assert.equal(callback.callCount, 0);
  });
  it('should call forEach for each defined key in an object', () => {
    forEach(obj, callback);
    assert.equal(callback.callCount, 3);
    assert.equal(callback.callCount, 3);
  });
});

describe('size test suite', () => {
  it('should return undefined if both operands are undefined', () => {
    assert.isUndefined(size());
  });
  it('should return 0 for empty object', () => {
    const obj = {};
    assert.equal(size(obj), 0);
  });
  it('should return count of values on a object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    assert.equal(size(obj), 3);
  });
});
