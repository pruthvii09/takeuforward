import { useState } from "react";
import axios from "axios";

const usePostApiData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (url, headers, dataToSend) => {
    setLoading(true);
    try {
      const res = await axios.post(url, dataToSend, headers);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendData };
};

export default usePostApiData;
