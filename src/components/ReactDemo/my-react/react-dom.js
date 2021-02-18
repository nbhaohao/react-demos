import { MY_REACT_EFFECT_INIT, MY_REACT_TEXT_NODE } from "./constants";

// 下一个任务
let nextUnitOfWork = null;
let workInProgressFiber = null;

// 创建 node
function createNode(vNode) {
  let node = null;
  const { type, props } = vNode;
  if (type === MY_REACT_TEXT_NODE) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vNode)
      : updateFunctionComponent(vNode);
  } else {
    node = document.createDocumentFragment();
  }
  // appendNodeChildren(props.children, node);

  // 更新所有节点的属性
  updateNode(node, props);

  return node;
}

function updateFunctionComponent(vNode) {
  const { type, props } = vNode;
  const renderedVNode = type(props);
  return createNode(renderedVNode);
}

function updateClassComponent(vNode) {
  const { type, props } = vNode;
  const renderedVNode = new type(props).render();
  return createNode(renderedVNode);
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
    if (Array.isArray(child)) {
      child.forEach((childItem) => render(childItem, node));
    } else {
      render(child, node);
    }
  });
}

// vNode -> node -> 插入到页面 DOM 中
function render(vNode, container) {
  const node = createNode(vNode);
  container.appendChild(node);
  workInProgressFiber = {
    node: container,
    props: {
      children: [vNode],
    },
  };
  nextUnitOfWork = workInProgressFiber;
}

/**
 * Fiber 属性：
 * type 元素类型
 * key 元素唯一性标识
 * child 第一个子 Fiber
 * sibling 兄弟 Fiber
 * return 父 Fiber
 * node 真实 DOM
 * base 上次自身的 Fiber
 * props 属性组
 * effectTag 标记要执行的操作类型
 * @param workInProgressFiber
 * @param children
 */
function reconcileChildren(workInProgressFiber, children) {
  let prevSibling = null;
  children.forEach((child, index) => {
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgressFiber,
      effectTag: MY_REACT_EFFECT_INIT,
    };
    if (index === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  });
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

function updateFunctionComponent_fiber(fiber) {
  const { type, props } = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

function updateClassComponent_fiber(fiber) {
  const { type, props } = fiber;
  const children = [new type(props).render()];
  reconcileChildren(fiber, children);
}

function performUnitOrWork(fiber) {
  const { type } = fiber;

  if (typeof type === "function") {
    type.prototype.isReactComponent
      ? updateClassComponent_fiber(fiber)
      : updateFunctionComponent_fiber(fiber);
  } else {
    updateHostComponent(fiber);
  }

  // 获取下个 fiber 节点
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }
  if (fiber.effectTag === MY_REACT_EFFECT_INIT && fiber.node !== null) {
    parentNodeFiber.node.appendChild(fiber.node);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

function commitRoot() {
  commitWorker(workInProgressFiber.child);
  workInProgressFiber = null;
}

function workLoop(deadLine) {
  // 有下个任务，且浏览器还剩余的空闲时间
  while (nextUnitOfWork && deadLine.timeRemaining() > 1) {
    // 执行当前任务，并获取下个任务
    nextUnitOfWork = performUnitOrWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && workInProgressFiber) {
    // 提交
    commitRoot();
  }
  window.requestIdleCallback(workLoop);
}

window.requestIdleCallback(workLoop);

export default { render };
