import { MY_REACT_TEXT_NODE } from "./constants";

// 创建 node
function createNode(vNode) {
  console.log(vNode);
  let node = null;
  const { type, props } = vNode;
  if (type === MY_REACT_TEXT_NODE) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  }
  appendNodeChildren(props.children, node);

  // 更新所有节点的属性
  updateNode(node, props);

  return node;
}

function updateNode(node, newProps) {
  Object.keys(newProps)
    .filter((propName) => propName !== "children")
    .forEach((propName) => {
      node[propName] = newProps[propName];
    });
}

// 把 children vNode -> node -> 插入到容器中
function appendNodeChildren(children, node) {
  children.forEach((child) => {
    render(child, node);
  });
}

// vNode -> node -> 插入到页面 DOM 中
function render(vNode, container) {
  const node = createNode(vNode);
  container.appendChild(node);
}

export default { render };
