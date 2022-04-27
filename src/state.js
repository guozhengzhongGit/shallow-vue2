import { observe } from "./observe";

export function initState(vm) {
  const options = vm.$options;
  // console.log(options);
  // 后续实现 computed、watch、props、methods
  if (options.data) {
    initData(vm);
  }
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newVal) {
      vm[source][key] = newVal;
    },
  });
}

function initData(vm) {
  let data = vm.$options.data;
  // data 允许传入函数和对象两种形式，因此需要判断
  data = vm._data = typeof data === "function" ? data.call(vm) : data;

  for (let k in data) {
    proxy(vm, "_data", k);
  }
  // 属性劫持
  observe(data);
  // 经过 observe 处理后的 data 都被观测过了，拥有了 get 和 set
  // 但是现在的这个 data 是响应式化处理后的，页面里是直接获取不到的，想要获取，还是得挂到 vm 上
}
