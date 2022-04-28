let oldArrayPrototype = Array.prototype;
// arrPrototype.__proto__ = oldArrayPrototype;
let arrPrototype = Object.create(oldArrayPrototype);
const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "sort",
  "splice",
  "reverse",
];
methods.forEach((method) => {
  // 调用这个方法的，就是某个数组数据，即 data 里的某一个成员
  arrPrototype[method] = function (...args) {
    console.log("劫持的数组方法");
    let inserted;
    const ob = this.__ob__;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if (inserted) {
      // 对新增的数据也要进行观测，此时需要调用 index.js 里的 observeArr 方法，但这个方法是存在另一个文件的类里的，怎么办
      // 因为这里的 this 就是 data 里的某个数据，所以已经是经过 observe 处理过的了，即 new Observer 的产物，所以
      ob.observeArr(inserted);
    }
    ob.dep.notify(); // 如果用户调用了 push 方法通知 dep
    return oldArrayPrototype[method].call(this, ...args); // 此处的 this 是谁，谁调用的这个方法，就是谁，比如外部肯定是用户写一个 [].push(1)那么 this 就是这个数组自己
  };
});

export default arrPrototype;
