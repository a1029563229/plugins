import React from "react";
import { Card, Form, Input, Button } from "antd";
import { formItemLayout } from "@/components/theme";

const rule = {
  name: {
    required: true
  },
  remark: {
    required: true
  }
};

const Add = ({ form }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    form
      .validateFields()
      .then(async values => {
        console.log({ values });
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
        <Form.Item label="备注：">
          {getFieldDecorator("remark", {
            rules: [rule.name]
          })(<Input placeholder="请输入备注" />)}
        </Form.Item>
        <Form.Item label="SQL 语句：">
          {getFieldDecorator("sql", {
            rules: [rule.name]
          })(
            <Input.TextArea
              style={{ height: 200 }}
              placeholder="请输入 SQL 语句"
            />
          )}
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
