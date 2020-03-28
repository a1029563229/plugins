import React from "react";
import { Table } from "antd";

const { Column } = Table;

const DyTable = ({ dataSource, pageInfo, onChange, tableColumns }) => {
  if (!tableColumns || !tableColumns.length) return null;

  const pagination = {
    onChange,
    ...pageInfo
  };

  console.log(tableColumns);

  return (
    <Table scroll={{ x: 5000 }} dataSource={dataSource} pagination={pagination}>
      {tableColumns.map(item => (
        <Column title={item.name} dataIndex={item.key} key={item.key} />
      ))}
    </Table>
  );
};

export default DyTable;
