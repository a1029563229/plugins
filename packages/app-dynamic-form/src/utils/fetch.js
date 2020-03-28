import instance from "../axios";

async function fetchList({ request_url, request_list_url, params }) {
  const url = request_list_url || `${request_url}/list`;
  const { data } = await instance.get(url, { params });
  return data;
}

export { fetchList };
