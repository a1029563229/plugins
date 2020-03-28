import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";

import axios from "@/axios";
import { fetchList } from "@/utils/fetch";
import DyTable from "./DyTable";

const DynamicTable = () => {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const table_id = query.get("id");

  // 设置动态表信息
  const [tableInfo, setTableInfo] = useState(null);
  useEffect(() => {
    (async () => {
      const result = await axios.get("/table", { params: { table_id } });
      const { data } = result;
      setTableInfo(data);
    })();
  }, []);

  // 设置数据表格信息 (column)
  const [tableColumns, setTableColumns] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (!tableInfo) return;

    const { json_doc } = tableInfo;
    setTableColumns(JSON.parse(json_doc));
    setPage(1);
  }, [tableInfo]);

  // 请求列表数据
  const [list, setList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    if (page < 1) return;
    (async () => {
      const listData = await fetchList({
        request_url: tableInfo.request_url,
        params: { page_index: page, page_size: 20 }
      });

      setList(listData.list);
      setPageInfo({
        current: listData.page_index,
        pageSize: listData.page_size,
        total: listData.total
      });
    })();
  }, [page]);

  if (!tableInfo) return null;

  return (
    <Card title={`${tableInfo.name}（${tableInfo.cn_name}）`}>
      <section>
        <Row style={{ marginBottom: 20 }}>
          <Col span="6">
            <Button type="primary" onClick={() => history.push(`/dynamicForm?id=${table_id}`)}>插入数据</Button>
          </Col>
        </Row>
        <DyTable
          dataSource={list}
          onChange={setPage}
          pageInfo={pageInfo}
          tableColumns={tableColumns}
        />
      </section>
    </Card>
  );
};

export default DynamicTable;
