import React, { useState, useEffect } from "react";
import { Card, Form, Radio, Button } from "antd";
import { useHistory } from "react-router-dom";
import axios from "@/axios";

const rule = {
  table_id: {
    required: true
  }
};

const Home = ({ form }) => {
  const history = useHistory();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("/table/list");
      const { data } = result;
      setOptions(
        data.map(item => ({
          label: `${item.name}（${item.cn_name}）`,
          value: item.table_id
        }))
      );
    })();
  }, []);
  
  const handleSubmit = async e => {
    e.preventDefault();
    form
      .validateFields()
      .then(async values => {
        const { table_id } = values;
        history.push(`/dynamicTable?id=${table_id}`);
      })
      .catch(console.error);
  };

  const { getFieldDecorator } = form;
  return (
    <Card title="欢迎来到动态表">
      <Form onSubmit={handleSubmit}>
        <Form.Item label="表类型：">
          {getFieldDecorator("table_id", {
            rules: [rule.table_id]
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
