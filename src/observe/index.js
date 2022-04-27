class Observer {
  constructor(data) {
    this.walk(data);
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
  // 属性会全部被劫持重写增加了 get 和 set
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue;
      }
    },
  });
}

export function observe(data) {
  if (!data || typeof data !== "object") return;
  // 对数据进行响应式化
  // 如果一个对象已经被观测过，就不用再次观测了，需要加一个标识 __ob__
  return new Observer(data);
}
