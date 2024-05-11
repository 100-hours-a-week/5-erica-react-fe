import { useEffect, useState, useCallback } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLodaing] = useState(false);

  const fetchApi = useCallback(async () => {
    setLodaing(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (json.status === 403 || json.status === 401) {
        alert("권한이 없습니다.");
        return;
      }

      if (json.status === 404) {
        alert("해당하는 페이지가 존재하지 않습니다.");
      }

      setData(json.data);
      setLodaing(false);
    } catch (err) {
      setError(err);
      setLodaing(false);
    }
  }, [url, options]);

  useEffect(function fetchedData() {
    fetchApi();
  }, []);

  return { data, error, loading };
}
