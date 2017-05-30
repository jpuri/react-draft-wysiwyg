'use strict';

var fs,
    Prom = require('any-promise'),
    slice = Array.prototype.slice,
    noError = /exists/,
    returnValue = /Sync$|watch|(Read|Write)Stream$|^Stats$/;

try {
  fs = require('fs-extra');
} catch(e) {
  try {
    fs = require('graceful-fs');
  } catch(e2){
    fs = require('fs');
  }
}

Object.keys(fs).forEach(function(key) {
  var func = fs[key];
  if (typeof func == 'function')
    if(returnValue.test(key)){
      exports[key] = fs[key];
    } else if(noError.test(key)){
      exports[key] = promiseWithoutError(func);
    } else {
      exports[key] = promise(func);
    }
});

function promise(func){
  return function(){
    var args = slice.call(arguments);
    return new Prom(function(resolve, reject){
      args.push(function(err, res){
        if(err) reject(err);
        else resolve(res);
      });
      func.apply(fs, args);
    });
  };
}

function promiseWithoutError(func){
  return function(){
    var args = slice.call(arguments);
    return new Prom(function(resolve){
      args.push(resolve);
      func.apply(fs, args);
    });
  };
}
