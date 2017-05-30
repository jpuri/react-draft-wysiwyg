/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
function Storage(duration) {
	this.duration = duration;
	this.running = {};
	this.data = {};
	this.levels = [];
	if(duration > 0) {
		this.levels.push([], [], [], [], [], [], [], [], []);
		for(var i = 8000; i < duration; i += 500)
			this.levels.push([]);
	}
	this.count = 0;
	this.interval = null;
	this.needTickCheck = false;
	this.nextTick = null;
	this.passive = true;
	this.tick = this.tick.bind(this);
}

Storage.prototype.ensureTick = function() {
	if(!this.interval && this.duration > 0 && !this.nextTick)
		this.interval = setInterval(this.tick, Math.floor(this.duration / this.levels.length));
};

Storage.prototype.finished = function(name, err, result) {
	var callbacks = this.running[name];
	delete this.running[name];
	if(this.duration > 0) {
		this.count++;
		this.data[name] = [err, result];
		this.levels[0].push(name);
		this.ensureTick();
	}
	for(var i = 0; i < callbacks.length; i++) {
		callbacks[i](err, result);
	}
};

Storage.prototype.finishedSync = function(name, err, result) {
	if(this.duration > 0) {
		this.count++;
		this.data[name] = [err, result];
		this.levels[0].push(name);
		this.ensureTick();
	}
};

Storage.prototype.provide = function(name, provider, callback) {
	var running = this.running[name];
	if(running) {
		running.push(callback);
		return;
	}
	if(this.duration > 0) {
		this.checkTicks();
		var data = this.data[name];
		if(data) {
			return process.nextTick(function() {
				callback.apply(null, data);
			});
		}
	}
	this.running[name] = running = [callback];
	var _this = this;
	provider(name, function(err, result) {
		_this.finished(name, err, result);
	});
};

Storage.prototype.provideSync = function(name, provider) {
	if(this.duration > 0) {
		this.checkTicks();
		var data = this.data[name];
		if(data) {
			if(data[0])
				throw data[0];
			return data[1];
		}
	}
	try {
		var result = provider(name);
	} catch(e) {
		this.finishedSync(name, e);
		throw e;
	}
	this.finishedSync(name, null, result);
	return result;
};

Storage.prototype.tick = function() {
	var decay = this.levels.pop();
	for(var i = decay.length - 1; i >= 0; i--) {
		delete this.data[decay[i]];
	}
	this.count -= decay.length;
	decay.length = 0;
	this.levels.unshift(decay);
	if(this.count === 0) {
		clearInterval(this.interval);
		this.interval = null;
		this.nextTick = null;
		return true;
	} else if(this.nextTick) {
		this.nextTick += Math.floor(this.duration / this.levels.length);
		var time = new Date().getTime();
		if(this.nextTick > time) {
			this.nextTick = null;
			this.interval = setInterval(this.tick, Math.floor(this.duration / this.levels.length));
			return true;
		}
	} else if(this.passive) {
		clearInterval(this.interval);
		this.interval = null;
		this.nextTick = new Date().getTime() + Math.floor(this.duration / this.levels.length);
	} else {
		this.passive = true;
	}
};

Storage.prototype.checkTicks = function() {
	this.passive = false;
	if(this.nextTick) {
		while(!this.tick());
	}
};

Storage.prototype.purge = function(what) {
	if(!what) {
		this.count = 0;
		clearInterval(this.interval);
		this.nextTick = null;
		this.data = {};
		this.levels.forEach(function(level) {
			level.length = 0;
		});
	} else if(typeof what === "string") {
		Object.keys(this.data).forEach(function(key) {
			if(key.indexOf(what) === 0)
				delete this.data[key];
		}, this);
	} else {
		for(var i = what.length - 1; i >= 0; i--) {
			this.purge(what[i]);
		}
	}
};

function CachedInputFileSystem(fileSystem, duration) {
	this.fileSystem = fileSystem;
	this._statStorage = new Storage(duration);
	this._readdirStorage = new Storage(duration);
	this._readFileStorage = new Storage(duration);
	this._readJsonStorage = new Storage(duration);
	this._readlinkStorage = new Storage(duration);

	this._stat = this.fileSystem.stat ? this.fileSystem.stat.bind(this.fileSystem) : null;
	if(!this._stat) this.stat = null;

	this._statSync = this.fileSystem.statSync ? this.fileSystem.statSync.bind(this.fileSystem) : null;
	if(!this._statSync) this.statSync = null;

	this._readdir = this.fileSystem.readdir ? this.fileSystem.readdir.bind(this.fileSystem) : null;
	if(!this._readdir) this.readdir = null;

	this._readdirSync = this.fileSystem.readdirSync ? this.fileSystem.readdirSync.bind(this.fileSystem) : null;
	if(!this._readdirSync) this.readdirSync = null;

	this._readFile = this.fileSystem.readFile ? this.fileSystem.readFile.bind(this.fileSystem) : null;
	if(!this._readFile) this.readFile = null;

	this._readFileSync = this.fileSystem.readFileSync ? this.fileSystem.readFileSync.bind(this.fileSystem) : null;
	if(!this._readFileSync) this.readFileSync = null;

	if(this.fileSystem.readJson) {
		this._readJson = this.fileSystem.readJson.bind(this.fileSystem);
	} else if(this.readFile) {
		this._readJson = function(path, callback) {
			this.readFile(path, function(err, buffer) {
				if(err) return callback(err);
				try {
					var data = JSON.parse(buffer.toString("utf-8"));
				} catch(e) {
					return callback(e);
				}
				callback(null, data);
			});
		}.bind(this);
	} else {
		this.readJson = null;
	}
	if(this.fileSystem.readJsonSync) {
		this._readJsonSync = this.fileSystem.readJsonSync.bind(this.fileSystem);
	} else if(this.readFileSync) {
		this._readJsonSync = function(path) {
			var buffer = this.readFileSync(path);
			var data = JSON.parse(buffer.toString("utf-8"));
			return data;
		}.bind(this);
	} else {
		this.readJsonSync = null;
	}

	this._readlink = this.fileSystem.readlink ? this.fileSystem.readlink.bind(this.fileSystem) : null;
	if(!this._readlink) this.readlink = null;

	this._readlinkSync = this.fileSystem.readlinkSync ? this.fileSystem.readlinkSync.bind(this.fileSystem) : null;
	if(!this._readlinkSync) this.readlinkSync = null;
}
module.exports = CachedInputFileSystem;

CachedInputFileSystem.prototype.stat = function(path, callback) {
	this._statStorage.provide(path, this._stat, callback);
};

CachedInputFileSystem.prototype.readdir = function(path, callback) {
	this._readdirStorage.provide(path, this._readdir, callback);
};

CachedInputFileSystem.prototype.readFile = function(path, callback) {
	this._readFileStorage.provide(path, this._readFile, callback);
};

CachedInputFileSystem.prototype.readJson = function(path, callback) {
	this._readJsonStorage.provide(path, this._readJson, callback);
};

CachedInputFileSystem.prototype.readlink = function(path, callback) {
	this._readlinkStorage.provide(path, this._readlink, callback);
};

CachedInputFileSystem.prototype.statSync = function(path) {
	return this._statStorage.provideSync(path, this._statSync);
};

CachedInputFileSystem.prototype.readdirSync = function(path) {
	return this._readdirStorage.provideSync(path, this._readdirSync);
};

CachedInputFileSystem.prototype.readFileSync = function(path) {
	return this._readFileStorage.provideSync(path, this._readFileSync);
};

CachedInputFileSystem.prototype.readJsonSync = function(path) {
	return this._readJsonStorage.provideSync(path, this._readJsonSync);
};

CachedInputFileSystem.prototype.readlinkSync = function(path) {
	return this._readlinkStorage.provideSync(path, this._readlinkSync);
};

CachedInputFileSystem.prototype.purge = function(what) {
	this._statStorage.purge(what);
	this._readdirStorage.purge(what);
	this._readFileStorage.purge(what);
	this._readlinkStorage.purge(what);
	this._readJsonStorage.purge(what);
};
