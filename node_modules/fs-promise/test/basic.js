'use strict';
/*globals describe, it, beforeEach, afterEach */

var fsp = require('..'),
    path = require('path'),
    assert = require('assert'),
    Prom = require('any-promise'),
    testdir = path.join(__dirname, 'tmp');

describe('basic', function(){
  beforeEach(function(){
    return fsp.mkdir(testdir).then(existstmp(true));
  });

  afterEach(function(){
    return fsp.remove(testdir).then(existstmp(false));
  });

  it('should create files and readdir', function(){
    return fsp.createFile(file('hello')).then(readtmp).then(function(files){
      assert.deepEqual(files.sort(), ['hello']);
      return fsp.createFile(file('world'));
    }).then(readtmp).then(function(files){
      assert.deepEqual(files.sort(), ['hello', 'world']);
    });
  });

  it('should pass through Sync as value', function(){
    return fsp.createFile(file('hello')).then(function(files){
      assert(fsp.existsSync(file('hello')));
      assert(!fsp.existsSync(file('world')));
      return fsp.createFile(file('world'));
    }).then(readtmp).then(function(files){
      assert(fsp.existsSync(file('hello')));
      assert(fsp.existsSync(file('world')));
    });
  });

  it('should copy with pipe read/write stream', function(){
    return fsp.writeFile(file('hello1'), 'hello world').then(function(){
      return fsp.readFile(file('hello1'), {encoding:'utf8'});
    }).then(function(contents){
      assert.equal(contents, 'hello world');
      var read = fsp.createReadStream(file('hello1')),
          write = fsp.createWriteStream(file('hello2')),
          promise = new Prom(function(resolve, reject){
            read.on('end', resolve);
            write.on('error', reject);
            read.on('error', reject);
          });
      read.pipe(write);
      return promise;
    }).then(function(){
      return fsp.readFile(file('hello2'), {encoding:'utf8'});
    }).then(function(contents){
      assert.equal(contents, 'hello world');
    });
  });
});

function file(){
  var args = [].slice.call(arguments);
  args.unshift(testdir);
  return path.join.apply(path, args);
}

function existstmp(shouldExist){
  return function(){
    return fsp.exists(testdir).then(function(exists){
        assert.equal(exists, shouldExist);
      });
  };
}

function readtmp(){
  return fsp.readdir(testdir);
}
