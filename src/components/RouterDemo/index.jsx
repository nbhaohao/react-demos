import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from "./react-router-dom";
const HomePage = (props) => {
  console.log("HomePage 接收 history 参数", props);
  return <div>home page</div>;
};

const UserPage = (props) => {
  return <div>user page</div>;
};

const LoginPage = (props) => {
  return <div>login page</div>;
};

const ErrorPage = (props) => {
  return <div>404</div>;
};

const children = (props) => <div>children</div>;
const render = (props) => {
  console.log(props);
  return <div>render</div>;
};

const RouterDemo = () => {
  return (
    <div>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/product/123">商品</Link>
        {/*<Switch>*/}
        <Route
          exact
          path="/"
          // component={HomePage}
          // children={children}
          render={render}
        />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
        <Route component={ErrorPage} />
        {/*</Switch>*/}
      </Router>
    </div>
  );
};

export default RouterDemo;
