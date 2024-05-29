import { useState, useCallback, useEffect } from "react";
import { navUrl } from "../utils/navigate";
import { useNavigate } from "react-router-dom";

export default function useFetch(url, options) {
  const [logIn, setLogIn] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      if (json.status === 401 || json.status === 403) {
        setLogIn(false);
        setResponseData(json);
        return;
      }

      if (json.status === 404) {
        alert("존재하지 않은 주소입니다.");
        setResponseData(json);
        navigate(navUrl.posts);
      }

      return;
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
