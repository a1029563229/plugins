import instance from "../axios";

async function fetchList({ request_url, request_list_url, params }) {
  const url = request_list_url || `${request_url}/list`;
  const { data } = await instance.get(url, { params });
  return data;
}

async function addItem({ request_url, request_create_url, params }) {
  const url = request_create_url || `${request_url}`;
  const { data } = await instance.put(url, params);
  return data;
}

async function updateItem({ request_url, request_update_url, params }) {
  const url = request_update_url || `${request_url}`;
  const { data } = await instance.post(url, params);
  return data;
}

export { fetchList, addItem, updateItem };
