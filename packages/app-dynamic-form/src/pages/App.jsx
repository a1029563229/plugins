import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Menu, message } from "antd";
import Home from "./home";
import Add from "./add";
import DynamicTable from "./dynamicTable";
import DynamicForm from "./dynamicForm";

const menus = [
  {
    key: "home",
    route: "/",
    title: "主页"
  },
  {
    key: "add",
    route: "/add",
    title: "新增表"
  }
];

const App = () => {
  useEffect(() => {
    // 捕获未被单独处理的 Error(Reject)
    window.addEventListener("unhandledrejection", e => {
      console.log({ e });
      message.error(e.reason.message);
    });
  }, []);

  const [refresh, setRefresh] = useState(0);
  const [selectedKeys, setSelectKeys] = useState(["/"]);
  useEffect(() => {
    const { pathname } = window.location;
    const menu = menus.find(item => item.route === pathname);
    setSelectKeys(() => [menu ? menu.key : "/"]);
  }, [refresh]);

  return (
    <Router>
      <section>
        <Menu
          onClick={() => setRefresh(refresh => ++refresh)}
          selectedKeys={selectedKeys}
          theme="dark"
          mode="horizontal"
        >
          {menus.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.route}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/dynamicTable" component={DynamicTable} />
          <Route exact path="/dynamicForm" component={DynamicForm} />
        </Switch>
      </section>
    </Router>
  );
};

export default App;
