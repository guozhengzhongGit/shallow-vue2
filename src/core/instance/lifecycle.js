export function initLifecycle(vm) {
  vm._watcher = null
}
export function callHook(vm, hook) {
  console.log(hook)
}
export function lifecycleMixin(Vue) {
  Vue.prototype._mount = function() {
    
  }
}