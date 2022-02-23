import Vue from "./runtime/index.js";
import { compileToFunctions } from "./compiler/index";
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el) {
  el = el && document.querySelector(el);
  if (el === document.body || el === document.documentElement) {
    alert("不能是body或者html");
    return this;
  }
  const options = this.$options;
  if (!options.render) {
    const { render, staticRenderFns } = compileToFunctions();
    options.render = render;
    options.staticRenderFns = staticRenderFns;
  }
  return mount.call(this, el);
};
Vue.compile = compileToFunctions
export default Vue;

// vue 的启动入口，暂存 runtime 里的 mount 方法，先编译，生成 render 函数，然后再执行 mount
