import axios from "axios";
import { useEffect, useState } from "react";

const useGetApiData = (url, headers) => {
  const [data, setData] = useState([]);
  const [getLoading, setLoading] = useState(true);
  const [getError, setError] = useState(null);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await axios.get(url, headers);

        setData(res.data);
      } catch (error) {
        setError(error.response?.data?.error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, getLoading, getError };
};

export default useGetApiData;
