import { useState } from "react";

export default function useFetchEvent(url, options) {
  const [loading, setLoading] = useState(false);

  const fetchEventApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (json.status === 200 || json.status === 201) {
        setLoading(false);
        return json;
      }
      setLoading(false);
      alert("존재하지 않은 주소입니다.");
      return null;
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return { loading, fetchEventApi };
}
