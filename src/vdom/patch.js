export function patch(oldVnode, vnode) {
  console.log(oldVnode, vnode);
  // 判断是更新还是渲染
  const isRealEle = oldVnode.nodeType;
  if (isRealEle) {
    const oldElement = oldVnode;
    const parentElement = oldElement.parentNode;

    let el = createEl(vnode);
    parentElement.insertBefore(el, oldElement.nextSibling);
    parentElement.removeChild(oldElement);
    return el;
  }
}

function createEl(vnode) {
  let { tag, data, key, children, text } = vnode;
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach((child) => {
      return vnode.el.appendChild(createEl(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;
  for (let k in newProps) {
    if (k === "style") {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (k === "class") {
      el.className = newProps.class;
    } else {
      el.setAttribute(k, newProps[k]);
    }
  }
}
