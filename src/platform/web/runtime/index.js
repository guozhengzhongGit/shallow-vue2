import Vue from "../../../core/index.js";

import { patch } from './patch';
Vue.__patch__ = patch;
Vue.prototype.$mount = function (el) {
  el = document.querySelector(el);
  return this._mount(el);
};

export default Vue;
// 引入 core 中定义的 vue，原型上添加 $mount 方法，而 $mount 实质上是调用实例上的 _mount 方法
