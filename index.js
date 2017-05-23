module.exports = function(target, key, descriptor) {
  const fType  = descriptor.get ? 'get' : 'value';
  const fn    = descriptor[fType];
  const char0 = String.fromCharCode(0);

  descriptor[fType] = function(){
    const keyAry = [];

    if (!this.hasOwnProperty("__memoized__")) {
      this.__memoized__ = {};
    }

    for (let i=0, l=arguments.length; i<l; i++) {
      const arg  = arguments[i];
      const type = typeof arg;

      keyAry.push(
        (arg  === null)               ? char0 + 'null'      :
        (arg  === void 0)             ? char0 + 'undefined' :
        (type === 'function')         ? char0 + arg         :
        (type === 'object' && arg.id) ? char0 + arg.id      :
        (type === 'object')           ? char0 + JSON.stringify(arg) :
        arg
      );
    }

    const cacheKey = key + keyAry.join(String.fromCharCode(0));

    if (!this.__memoized__.hasOwnProperty(cacheKey)) {
        this.__memoized__[cacheKey] = fn.apply(this, arguments);
    }

    return this.__memoized__[cacheKey];
  };

  return descriptor;
};

