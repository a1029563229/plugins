import React from "react";
import { Input, DatePicker, InputNumber } from "antd";

const DynamicFormItem = ({ onChange, value, type }) => {
  switch (type) {
    case "string":
      return <Input onChange={onChange} value={value} type="text" />;
    case "int":
    case "float64":
      return (
        <InputNumber
          style={{ width: "100%" }}
          onChange={onChange}
          value={value}
        />
      );
    case "time.Time":
      return (
        <DatePicker
          style={{ width: "100%" }}
          onChange={onChange}
          value={value}
        />
      );
    default:
      return <Input onChange={onChange} value={value} type="text" />;
  }
};

export default DynamicFormItem;
