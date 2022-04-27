import { initState } from "./state";
export default function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    console.log(options);
    const vm = this; // 当前实例
    vm.$options = options; // 后面所有的方法都可以用 $options 获取创造实例时传入的所以参数
    // vue 的 options 参数里可能有多种数据源，包括 data、props、methods、computed、watch 等，因此需要一个专门初始化整理数据源的方法
    initState(vm);

    // 数据初始化完成后，需要进行页面挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    el = document.querySelector(el);
    // 模板有几种情况，可以直接传 render，没有 render 就用 template，都没有，就用 el 的 outerHtmL 作为模板
    const options = vm.$options;
    if (!options.render) {
      let template = options.template;
      if (!template) {
        template = el.outerHTML;
      }
      const render = compileToFunction(template); // 将模板编译为 render 函数（编译原理）
      options.render = render; // 到这里 render 函数就一定存在了
    }
  };
}
