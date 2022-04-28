import { pushTarget, popTarget } from "./dep";
let id = 0;
class Watcher {
  constructor(vm, expOrFn, callback, options) {
    this.id = id++;
    this.vm = vm;
    this.getter = expOrFn;
    this.callback = callback;
    this.options = options;
    this.deps = [];
    this.depsId = new Set();
    this.get();
  }
  get() {
    pushTarget(this); // 把watcher 存起来
    this.getter(); // 执行渲染 watcher
    popTarget();
  }
  update() {
    this.get();
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}

export default Watcher;
