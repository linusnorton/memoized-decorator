module.exports = function(target, key, descriptor) {
  let cache = {};
  let fn    = descriptor.value;
  let char0 = String.fromCharCode(0);

  descriptor.value = function(){
    let keyAry = [];

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

    let key = keyAry.join(String.fromCharCode(0));

    return cache.hasOwnProperty(key) ? cache[key] : (cache[key] = fn.apply(this, arguments));
  };

  return descriptor;
};
