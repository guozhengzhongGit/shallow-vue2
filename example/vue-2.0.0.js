function initLifecycle(vm) {
  vm._watcher = null;
}
function callHook(vm, hook) {
  console.log(hook);
}
function lifecycleMixin(Vue) {
  Vue.prototype._mount = function() {
    
  };
}

function initState(vm) {
  vm._watchers = [];
  // initProps(vm)
  // initData(vm)
  // initComputed(vm)
  // initMethods(vm)
  // initWatch(vm)
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {};
  dataDef.get = function () {
    return this._data;
  };

Object.defineProperty(Vue.prototype, "$data", dataDef);

Vue.prototype.$watch = function () {
  options = options || {};
  options.user = true;
  return function unwatchFn() {};
};
}

function initRender(vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  vm.$mount();
}

function renderMixin(Vue) {
  Vue.prototype.$nextTick = function () {};
  Vue.prototype._render = function () {};
}

function mergeOptions() {
  return {}
}

let uid = 0;
function initMixin(Vue) {
  console.log('执行')
  Vue.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) ; else {
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
// 一直到 instance 里，才是真正 vue 的定义，它是一个构造函数，分别执行了各种 mixin 函数对 vue 进行扩展处理
// initMixin 执行时在原型上定义了 _init 方法，这样在 new Vue 时才有这个方法可以执行
// _init 里添加了 $options，进行了 options 合并的操作

function initGlobalAPI(Vue) {
  console.log('先执行');
    Vue.util = function () {

    };
    Vue.set = function () {

    };
    Vue.delete = function () {

    };
    Vue.nextTick = function () {

    };
}

initGlobalAPI(Vue); // 给 Vue 本身扩展静态方法
Vue.version = '2.0.0';

function patch(){}

Vue.__patch__ = patch;
Vue.prototype.$mount = function (el) {
  el = document.querySelector(el);
  return this._mount(el);
};
// 引入 core 中定义的 vue，原型上添加 $mount 方法，而 $mount 实质上是调用实例上的 _mount 方法

function compileToFunctions() {
    return {
        render: function render(){},
        staticRenderFns: []
    }
}

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
Vue.compile = compileToFunctions;

// vue 的启动入口，暂存 runtime 里的 mount 方法，先编译，生成 render 函数，然后再执行 mount

export { Vue as default };
