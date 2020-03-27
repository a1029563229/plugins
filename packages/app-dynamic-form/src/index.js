import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from "./pages/App";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
  , document.getElementById('root'));