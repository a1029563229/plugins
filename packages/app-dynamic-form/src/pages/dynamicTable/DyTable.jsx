import React from "react";
import { Table, Button } from "antd";

const { Column } = Table;

const DyTable = ({
  dataSource,
  pageInfo,
  tableColumns,
  onChange,
  onCopy,
  onUpdate
}) => {
  if (!tableColumns || !tableColumns.length) return null;

  const pagination = {
    onChange,
    ...pageInfo
  };

  return (
    <Table
      rowKey={(record, index) => index}
      scroll={{ x: 5000 }}
      dataSource={dataSource}
      pagination={pagination}
    >
      {tableColumns.map(item => (
        <Column title={item.name} dataIndex={item.key} key={item.key} />
      ))}
      <Column
        fixed="right"
        title="操作"
        key="operation"
        dataIndex="operation"
        render={(id, record) => (
          <>
            <Button
              style={{ marginRight: 20 }}
              onClick={() => onCopy(record)}
              type="primary"
            >
              复制
            </Button>
            <Button onClick={() => onUpdate(record)} type="primary">
              修改
            </Button>
          </>
        )}
      ></Column>
    </Table>
  );
};

export default DyTable;
