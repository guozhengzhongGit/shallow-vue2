import { initState } from "./state";
export default function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log(options);
    const vm = this; // 当前实例
    vm.$options = options; // 后面所有的方法都可以用 $options 获取创造实例时传入的所以参数
    // vue 的 options 参数里可能有多种数据源，包括 data、props、methods、computed、watch 等，因此需要一个专门初始化整理数据源的方法
    initState(vm);
  };
}
