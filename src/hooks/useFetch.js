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
