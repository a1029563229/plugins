import React from "react";
import { Card, Form, Radio, Button } from "antd";

const rule = {
  formName: {
    required: true
  }
};

const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" }
];

const Home = ({ form }) => {
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
      <Form onSubmit={handleSubmit}>
        <Form.Item label="表类型：">
          {getFieldDecorator("formName", {
            rules: [rule.formName],
            initialValue: 1
          })(<Radio.Group options={options} />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            查看动态表
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create()(Home);
