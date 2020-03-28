import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";

import axios from "@/axios";

const DynamicForm = () => {
  const query = new URLSearchParams(useLocation().search);
  const table_id = query.get("id");

  // 设置动态表信息
  const [tableInfo, setTableInfo] = useState(null);
  const [formConfig, setFormConfig] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("/table", { params: { table_id } });
      const { data } = result;
      setTableInfo(data);

      const { json_doc } = data;
      setFormConfig(JSON.parse(json_doc));
    })();
  }, []);

  console.log(formConfig);

  if (!tableInfo) return null;

  return (
    <Card title={`${tableInfo.name}（${tableInfo.cn_name}）`}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Form.Item label="表名：">
          {getFieldDecorator("name", {
            rules: [rule.name]
          })(<Input placeholder="请输入表名" />)}
        </Form.Item>
        <Form.Item label="中文名：">
          {getFieldDecorator("cn_name", {
            rules: [rule.cn_name]
          })(<Input placeholder="请输入中文名" />)}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DynamicForm;
