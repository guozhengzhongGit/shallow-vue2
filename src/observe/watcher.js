class Watcher {
  constructor(vm, expOrFn, callback, options) {
    this.vm = vm;
    this.getter = expOrFn;
    this.callback = callback;
    this.options = options;
    this.get();
  }
  get() {
    this.getter();
  }
}

export default Watcher;
