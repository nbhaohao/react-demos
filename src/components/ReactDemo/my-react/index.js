import { MY_REACT_TEXT_NODE } from "./constants";

function createElement(type, config, ...children) {
  const props = {
    ...config,
    // 把纯文本节点也转换成对象，方便处理
    children: children.map((child) =>
      typeof child === "object" ? child : createTextNode(child)
    ),
  };

  return {
    type,
    props,
  };
}

function createTextNode(text) {
  return {
    type: MY_REACT_TEXT_NODE,
    props: {
      children: [],
      nodeValue: text,
    },
  };
}

export default {
  createElement,
};
