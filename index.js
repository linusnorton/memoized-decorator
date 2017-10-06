module.exports = function(target, key, descriptor) {
  const fType  = descriptor.get ? 'get' : 'value';
  const fn    = descriptor[fType];
  const char0 = String.fromCharCode(0);

  descriptor[fType] = function(){
    const keyAry = [];
    const memoizedCache = Symbol.for('memoizedCache');

    this[memoizedCache] = this[memoizedCache] || {};

    for (let i=0, l=arguments.length; i<l; i++) {
      const arg  = arguments[i];
      const type = typeof arg;

      keyAry.push(
        (arg  === null)                     ? char0 + 'null'              :
        (arg  === void 0)                   ? char0 + 'undefined'         :
        (type === 'function')               ? char0 + arg                 :
        (type === 'object' && arg.id)       ? char0 + arg.id              :
        (type === 'object' && arg.hashCode) ? char0 + arg.hashCode()      :
        (type === 'object')                 ? char0 + JSON.stringify(arg) :
        arg
      );
    }

    const cacheKey = key + keyAry.join(String.fromCharCode(0));

    if (!this[memoizedCache].hasOwnProperty(cacheKey)) {
      this[memoizedCache][cacheKey] = fn.apply(this, arguments);
    }

    return this[memoizedCache][cacheKey];
  };

  return descriptor;
};

