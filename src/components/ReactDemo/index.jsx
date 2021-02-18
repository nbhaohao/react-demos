import React from "./my-react";
import ReactDOM from "./my-react/react-dom";
import Component from "./my-react/Component";

/**
 * 能够渲染文本元素、HTML 标签、class Component、FC Component
 * @type {JSX.Element}
 */

class ClassComponent extends Component {
  render() {
    return <div>我是 class 组件-{this.props.name}</div>;
  }
}

function FunctionComponent(props) {
  return <div>我是函数式组件-{props.name}</div>;
}

const jsx = (
  <div className="my-react">
    <p className="test-class">我是 p 元素</p>
    <a className="test-class">hello world</a>
    <ClassComponent className="test-class" name="类组件" />
    <FunctionComponent className="test-class" name="函数式组件" />
    <>渲染 fragment</>
    {[1, 2, 3].map((value) => (
      <div>处理数组的情况{value}</div>
    ))}
  </div>
);

ReactDOM.render(jsx, document.querySelector("#root"));
