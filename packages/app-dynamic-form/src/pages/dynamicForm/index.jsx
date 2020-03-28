import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Form, Button, message } from "antd";
import moment from "moment";

import axios from "@/axios";
import store from "@/store";
import { addItem, updateItem } from "@/utils/fetch";
import DynamicFormItem from "./DynamicFormItem";

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 12
  }
};

const formatValue = values => {
  for (let key in values) {
    const val = values[key];
    if (val && typeof val === "object" && val.format) {
      values[key] = val.format("YYYY-MM-DDTHH:mm:ssZ");
    }
  }
  return values;
};

const reFormatValue = (values, fields) => {
  const fieldsObj = {};
  fields.map(field => {
    return (fieldsObj[field.key] = field.type);
  });

  for (let key in values) {
    const val = values[key];
    if (fieldsObj[key] === "time.Time" && val) {
      values[key] = moment(val);
    }
  }
  return values;
};

const DynamicForm = ({ form }) => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const table_id = query.get("id");
  const operationType = query.get("type");

  // 设置动态表信息
  const [tableInfo, setTableInfo] = useState(null);
  const [formItemList, setFormItemList] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("/table", { params: { table_id } });
      const { data } = result;
      setTableInfo(data);

      const { json_doc } = data;
      setFormItemList(JSON.parse(json_doc));
    })();
  }, [table_id]);

  // 初始化值（复制功能）
  useEffect(() => {
    const { copyContent } = store.getState();
    if (copyContent && formItemList.length) {
      form.setFieldsValue(reFormatValue(copyContent, formItemList));
      store.dispatch({
        type: "CLEAR_COPY_CONTENT"
      });
    }
  }, [form, formItemList]);

  // 提交表单
  const handleSubmit = async e => {
    e.preventDefault();
    form
      .validateFields()
      .then(async values => {
        const params = formatValue(values);
        if (operationType === "update") {
          await updateItem({
            request_update_url: tableInfo.request_update_url,
            request_url: tableInfo.request_url,
            params
          });
          message.success(`修改 ${tableInfo.cn_name} 信息成功`);
        } else {
          await addItem({
            request_create_url: tableInfo.request_create_url,
            request_url: tableInfo.request_url,
            params
          });
          message.success(`新增 ${tableInfo.cn_name} 信息成功`);
        }
        history.go(-1);
      })
      .catch(console.error);
  };

  if (!tableInfo) return null;

  const { getFieldDecorator } = form;
  return (
    <Card title={`${tableInfo.name}（${tableInfo.cn_name}）`}>
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        {formItemList.map(item => (
          <Form.Item key={item.key} label={`${item.name}（${item.key}）：`}>
            {getFieldDecorator(item.key, {
              rules: []
            })(<DynamicFormItem {...item} />)}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {operationType !== "update" ? "新增" : "修改"}{tableInfo.cn_name}数据
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Form.create()(DynamicForm);
