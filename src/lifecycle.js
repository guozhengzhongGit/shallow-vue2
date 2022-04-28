import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";
export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    // 拿到虚拟 dom，创建真实 dom 去更新页面
    console.log(vnode);
    vm.$el = patch(vm.$el, vnode); // 虚拟节点创建出真实节点，替换掉原有的 $el
  };
}

export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el; // 真实的 dom 元素
  console.log(options, vm.$el);

  // 渲染（更新）页面
  let updateComponent = () => {
    // 每次数据变化，触发这个方法，这个方法里调用 _render 生成新的虚拟 dom 传给 _update 方法，因此 _update 接收的参数是 vnode
    // vm._render() 方法返回虚拟 dom
    // vm._update() 方法把虚拟 dom 生成真实 dom
    // 使用渲染 Watcher，每个组件都有一个 watcher
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, () => {}, true); // true 表示它是一个渲染 watcher
}
