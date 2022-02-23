export function initRender(vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  vm.$mount();
}

export function renderMixin(Vue) {
  Vue.prototype.$nextTick = function () {};
  Vue.prototype._render = function () {};
}
