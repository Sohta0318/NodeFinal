import useSWR from "swr";
import axios from "axios";

const useFetch = (url) => {
  const token = localStorage.getItem("token");
  const fetcher = (url, token) =>
    axios
      .get(url, { headers: { Authorization: "Bearer " + token } })
      .then((res) => res.data);
  const { data, error } = useSWR([url, token], fetcher);
  return {
    data,
    error,
  };
};

export default useFetch;
