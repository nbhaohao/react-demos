import React from "./my-react";
import ReactDOM from "./my-react/react-dom";

const jsx = (
  <div className="my-react">
    <p>我是 p 元素</p>
    <a>hello world</a>
  </div>
);

ReactDOM.render(jsx, document.querySelector("#root"));
