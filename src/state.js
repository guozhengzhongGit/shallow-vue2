import { observe } from "./observe";

export function initState(vm) {
  const options = vm.$options;
  console.log(options);
  // 后续实现 computed、watch、props、methods
  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  // data 允许传入函数和对象两种形式，因此需要判断
  data = typeof data === "function" ? data.call(vm) : data;
  // 属性劫持
  observe(data);
  // 经过 observe 处理后的 data 都被观测过了，拥有了 get 和 set
  console.log(data);
}
