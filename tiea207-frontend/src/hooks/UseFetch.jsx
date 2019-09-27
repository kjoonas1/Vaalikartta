import { useState, useEffect } from "react";
import axios from 'axios';

// Toteuttaa get-pyynnöt. Ei virheiden käsittelyä toistaiseksi.
function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(url);
        setData(response.data);
    }
    fetchData();
  }, [url]);
  return [data];
}
export { useFetch };