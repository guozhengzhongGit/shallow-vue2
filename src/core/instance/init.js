import { initLifecycle, callHook } from "./lifecycle";
import { initState } from "./state";
import { initRender } from "./render";
import { mergeOptions } from "../util/index";
let uid = 0;
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
    } else {
      vm.$options = mergeOptions();
    }
    vm._renderProxy = vm;
    vm._self = vm;
    initLifecycle(vm);
    callHook(vm, "beforeCreate");
    initState(vm);
    callHook(vm, "created");
    initRender(vm);
  };
}
