import { createElement, createTextNode } from "./vdom/create-element";
export function renderMixin(Vue) {
  // _c 创建元素的 vnode
  // _v 创建文本的 vnode
  // _s 变量
  Vue.prototype._c = function () {
    return createElement(...arguments);
  };
  Vue.prototype._v = function (text) {
    return createTextNode(text);
  };
  Vue.prototype._s = function (val) {
    if (!val) return "";
    if (typeof val === "object") return JSON.stringify(val);
    return val;
  };
  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;
    let vnode = render.call(vm);
    return vnode;
  };
}
