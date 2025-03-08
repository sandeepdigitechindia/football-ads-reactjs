import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Meta from "../components/Meta";
import API from "../api";
const PageComponent = ({ children }) => {
  const location = useLocation();
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const pageSlug = location.pathname.replace("/", "") || "home"; 
        const response = await API.get(`/api/meta-tags/${pageSlug}`);
        // const data = await response.json();
        setMeta(response.data);
      } catch (error) {
        console.error("Meta data fetch error:", error);
      }
    };

    fetchMeta();
  }, [location.pathname]);

  return (
    <>
      {meta && <Meta title={meta.title} description={meta.description} image={meta.image} url={window.location.href} />}
      {children}
    </>
  );
};

export default PageComponent;
