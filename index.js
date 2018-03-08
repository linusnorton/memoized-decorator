
function ObjectWithoutPrototypeCache () {
  this.cache = Object.create(null);
}

ObjectWithoutPrototypeCache.prototype.has = function(key) {
  return (key in this.cache);
};

ObjectWithoutPrototypeCache.prototype.get = function(key) {
  return this.cache[key];
};

ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
  this.cache[key] = value;
};

module.exports = function(target, key, descriptor) {
  const fType  = descriptor.get ? 'get' : 'value';
  const fn    = descriptor[fType];
  const char0 = String.fromCharCode(0);
  const memoizedCache = Symbol.for('memoizedCache');
  target[memoizedCache] = target[memoizedCache] || new ObjectWithoutPrototypeCache();

  descriptor[fType] = function() {
    let cacheKey = key;

    for (const arg of arguments) {
      const type = typeof arg;

      cacheKey += char0 + (
        (arg  === null)                     ? 'null'              :
        (arg  === void 0)                   ? 'undefined'         :
        (type === 'function')               ? arg                 :
        (type === 'object' && arg.id)       ? arg.id              :
        (type === 'object' && arg.hashCode) ? arg.hashCode()      :
        (type === 'object')                 ? JSON.stringify(arg) :
        arg
      );
    }

    if (!this[memoizedCache].has(cacheKey)) {
      this[memoizedCache].set(cacheKey, fn.apply(this, arguments));
    }

    return this[memoizedCache].get(cacheKey);
  };

  return descriptor;
};

