import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";

import { formItemLayout } from "@/components/theme";
import axios from "@/axios";

const rule = {
  name: {
    required: true
  },
  cn_name: {
    required: true
  },
  remark: {
    required: true
  },
  sql: {
    required: true
  },
  request_url: {
    required: true
  }
};

const Add = ({ form }) => {
  const history = useHistory();
  
  const handleSubmit = async e => {
    e.preventDefault();
    form
      .validateFields()
      .then(async values => {
        const result = await axios.put(
          "http://node.dynamic-form.com/table",
          values
        );
        const { code } = result;
        if (code !== 0) {
          return message.error(result.message);
        }
        message.success(`新增 ${values.name} 表成功`);
        history.push("/");
      })
      .catch(console.error);
  };

  const { getFieldDecorator } = form;
  return (
    <Card title="欢迎来到动态表">
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
        <Form.Item label="备注：">
          {getFieldDecorator("remark", {
            rules: []
          })(<Input placeholder="请输入备注" />)}
        </Form.Item>
        <Form.Item label="DDL 语句：">
          {getFieldDecorator("sql", {
            rules: [rule.sql]
          })(
            <Input.TextArea
              style={{ height: 200 }}
              placeholder="请输入 DDL 语句"
            />
          )}
        </Form.Item>
        <Form.Item label="请求地址：">
          {getFieldDecorator("request_url", {
            rules: [rule.request_url]
          })(<Input placeholder="请输入请求地址" />)}
        </Form.Item>
        <Form.Item label="请求地址（列表）：">
          {getFieldDecorator("request_list_url", {
            rules: []
          })(<Input placeholder="请输入列表请求地址" />)}
        </Form.Item>
        <Form.Item label="请求地址（详情）：">
          {getFieldDecorator("request_info_url", {
            rules: []
          })(<Input placeholder="请输入详情请求地址" />)}
        </Form.Item>
        <Form.Item label="请求地址（新增）：">
          {getFieldDecorator("request_add_url", {
            rules: []
          })(<Input placeholder="请输入新增请求地址" />)}
        </Form.Item>
        <Form.Item label="请求地址（修改）：">
          {getFieldDecorator("request_update_url", {
            rules: []
          })(<Input placeholder="请输入修改请求地址" />)}
        </Form.Item>
        <Form.Item label="请求地址（删除）：">
          {getFieldDecorator("request_delete_url", {
            rules: []
          })(<Input placeholder="请输入删除请求地址" />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
          <Button type="primary" htmlType="submit" block>
            新增动态表
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create()(Add);
