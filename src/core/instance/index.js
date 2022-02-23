import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { lifecycleMixin } from "./lifecycle";
function Vue(options) {
  if (!(this instanceof Vue)) {
    alert("必须 new");
  }
  this._init(options);
}
initMixin(Vue);
stateMixin(Vue);

lifecycleMixin(Vue);
renderMixin(Vue);
export default Vue;
// 一直到 instance 里，才是真正 vue 的定义，它是一个构造函数，分别执行了各种 mixin 函数对 vue 进行扩展处理
// initMixin 执行时在原型上定义了 _init 方法，这样在 new Vue 时才有这个方法可以执行
// _init 里添加了 $options，进行了 options 合并的操作
