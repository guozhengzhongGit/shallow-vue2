// dep 里存的是 watcher
let id = 0;
export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  depend() {
    // 让 watcher 记住 dep
    Dep.target.addDep(this);
    // this.subs.push(Dep.target);
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

let stack = [];
export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}
export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}
