import initMixin from "./init";
function Vue(options) {
  this._init(options); // 先进性初始化
}

// 原型方法不止一个 _init，如果所有的方法都写在一个文件里，不利于维护和管理，所以把添加的原型方法都按照文件拆分出去，用分文件管理的方式
// 但是拆分出去的文件里，也是需要 Vue 的，直接引用，就会循环引用，因此使用函数的方式，将 Vue 作为参数传入，也可以给 Vue 上挂上方法

initMixin(Vue);
// 后续再想扩展任何方法，都可以采用这种方式

export default Vue;
