import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLodaing] = useState(false);
  const navigate = useNavigate();

  const fetchApi = useCallback(async () => {
    setLodaing(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (json.status === 403 || json.status === 401 || json.status === 404) {
        setData(null);
        setLodaing(false);
        return;
      }

      if (json.status === 404) {
        setData(null);
        setLodaing(false);
        alert("존재하지 않은 주소입니다.");
        navigate(-1);
        return;
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
