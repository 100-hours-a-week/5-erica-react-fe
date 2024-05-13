import { useState, useCallback, useEffect } from "react";

export default function useFetch(url, options) {
  const [logIn, setLogIn] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      console.log(json);
      if (json.status === 200 || json.status === 201) {
        setLogIn(true);
        setResponseData(json);
        setLoading(false);
        return;
      }
      setLoading(false);
      if (json.status === 401 || json.stats === 403) {
        setLogIn(false);
        return;
      }

      setLogIn(false);
      alert("존재하지 않은 주소입니다.");
    } catch (err) {
      setLogIn(false);
      setError(err);
      setLoading(false);
    }
  }, [url, options]);

  useEffect(function fetchedData() {
    fetchApi();
  }, []);

  return { responseData, error, loading, logIn };
}
