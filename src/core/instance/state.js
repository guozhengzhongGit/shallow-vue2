export function initState(vm) {
  vm._watchers = [];
  // initProps(vm)
  // initData(vm)
  // initComputed(vm)
  // initMethods(vm)
  // initWatch(vm)
}

export function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {};
  dataDef.get = function () {
    return this._data;
  };
}
Object.defineProperty(Vue.prototype, "$data", dataDef);

Vue.prototype.$watch = function () {
  const vm = this;
  options = options || {};
  options.user = true;
  return function unwatchFn() {};
};
