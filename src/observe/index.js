import arrPrototype from "./array";
class Observer {
  constructor(data) {
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false,
    });
    // 如果是数组的话使用 defineProperty 会浪费很多性能，不推荐这么做
    // 改写数组方法，如果使用了可以改变数组的 api，就去劫持这个方法；变异方法：push、pop、shift、unshift、sort、splice、reverse
    // 修改数组的索引和长度无法更新视图
    if (Array.isArray(data)) {
      data.__proto__ = arrPrototype;
      // 数组里的某一项也可能是对象，所以也需要去观测
      this.observeArr(data);
    } else {
      this.walk(data);
    }
  }
  observeArr(data) {
    data.forEach((item) => observe(item));
  }
  walk(data) {
    let keys = Object.keys(data);
    // 重新把对象的 key 定义一遍
    keys.forEach((k) => {
      defineReactive(data, k, data[k]);
    });
  }
}

function defineReactive(data, key, value) {
  observe(value); // 递归劫持属性，data 里传的对象可能不止一层
  // 属性会全部被劫持重写增加了 get 和 set
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        observe(newValue); // 赋予的新值也要观测
        value = newValue;
      }
    },
  });
}

export function observe(data) {
  if (!data || typeof data !== "object") return;
  // 对数据进行响应式化
  if (data.__ob__) return data;
  // 如果一个对象已经被观测过，就不用再次观测了，需要加一个标识 __ob__
  return new Observer(data);
}
