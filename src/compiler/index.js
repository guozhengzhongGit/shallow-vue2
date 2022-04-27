const ncname = "[a-zA-Z_][\\w\\-\\.]*";
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
const startTagOpen = new RegExp("^<" + qnameCapture);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
const singleAttrIdentifier = /([^\s"'<>\/=]+)/;
const singleAttrAssign = /(?:=)/;
const singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source,
];
const attribute = new RegExp(
  "^\\s*" +
    singleAttrIdentifier.source +
    "(?:\\s*(" +
    singleAttrAssign.source +
    ")" +
    "\\s*(?:" +
    singleAttrValues.join("|") +
    "))?"
);
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;

function parserHTML(html) {
  function advance(n) {
    html = html.substring(n); // 每次根据传入的长度截取 HTML
  }

  let root;
  // 构建父子关系，利用栈的结构
  let stack = [];

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1, // 元素的类型是 1
      attrs,
      children: [],
      parent: null,
    };
  }
  function start(tagName, attrs) {
    const element = createASTElement(tagName, attrs); // 开始标签创建一个元素
    if (!root) {
      root = element;
    }
    let parent = stack[stack.length - 1]; // 取栈里最后一个元素
    if (parent) {
      element.parent = parent;
      parent.children.push(element);
    }
    stack.push(element);
  }
  function end(tagName) {
    stack.pop();
  }
  function chars(text) {
    text = text.replace(/\s/g, "");
    if (text) {
      let parent = stack[stack.length - 1];
      parent.children.push({
        type: 3,
        text,
      });
    }
  }
  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      // 第一次解析肯定是以 < 开头
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      let matches;
      if ((matches = html.match(endTag))) {
        end(matches[1]);
        advance(matches[0].length);
        continue;
      }
    }
    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function parseStartTag() {
    const matches = html.match(startTagOpen);
    if (matches) {
      console.log(matches);
      const match = {
        tagName: matches[1],
        attrs: [],
      };
      advance(matches[0].length);
      console.log(html);
      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        // 只要没匹配到结束标签，就一直匹配
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  return root;
}

function genProps(attrs) {
  let str = "";
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    // 特殊属性比如 style
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").reduce((memo, current) => {
        let [key, value] = current.split(":");
        memo[key] = value.replace(/\s/g, "");
        return memo;
      }, obj);
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}

function genChild(node) {
  console.log(node);
  if (node.type === 1) {
    return genCode(node);
  } else {
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(node.text)})`; // 没有双大括号表达式
    } else {
      let tokens = [];
      let match;
      // exec全局匹配时会有 lastIndex 问题，每次匹配前需要手动将 lastIndex 置为 0
      let startIndex = (defaultTagRE.lastIndex = 0);
      while ((match = defaultTagRE.exec(text))) {
        let endIndex = match.index; // 匹配到的索引
        if (endIndex > startIndex) {
          tokens.push(JSON.stringify(text.slice(startIndex, endIndex)));
        }
        tokens.push(`_s(${match[1].trim()})`);
        startIndex = endIndex + match[0].length;
      }
      if (startIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(startIndex)));
      }
      return `_v(${tokens.join("+")})`;
    }
  }
}

function genChildren(ast) {
  const children = ast.children;
  return children.map((child) => genChild(child)).join(",");
}

function genCode(ast) {
  let code;
  code = `_c('${ast.tag}',${
    ast.attrs.length ? genProps(ast.attrs) : "undefined"
  }${ast.children ? "," + genChildren(ast) : ""})`;

  return code;
}

export function compileToFunction(template) {
  console.log(template);
  let ast = parserHTML(template);
  console.log(ast);
  // 先生成 ast 语法树
  // ast 描述的是语法本身，HTML 里有啥就出现啥
  // 根据 ast 语法树转换为 render 函数
  let code = genCode(ast);
  // console.log(code);

  const render = new Function(`with(this) {return ${code}}`);
  console.log(render);
  return render;
}
