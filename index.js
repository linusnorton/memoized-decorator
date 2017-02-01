module.exports = function(target, key, descriptor) {
  var fn    = descriptor.value;
  var char0 = String.fromCharCode(0);

  descriptor.value = function(){
    var keyAry = [];

    if (!this.hasOwnProperty("__memoized__")) {
      this.__memoized__ = {};
    }

    for (let i=0, l=arguments.length; i<l; i++) {
      let arg  = arguments[i];
      let type = typeof arg;

      keyAry.push(
        (arg  === null)       ? char0 + 'null'      :
        (arg  === void 0)     ? char0 + 'undefined' :
        (type === 'function') ? char0 + arg         :
        (type === 'object')   ? char0 + JSON.stringify(arg) :
        arg
      );
    }

    var key = keyAry.join(String.fromCharCode(0));

    if (!this.__memoized__.hasOwnProperty(key)) {
        this.__memoized__[key] = fn.apply(this, arguments);
    }

    return this.__memoized__[key];
  };

  return descriptor;
};
