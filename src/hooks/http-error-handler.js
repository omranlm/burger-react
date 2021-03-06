//import

import { useEffect, useState } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInter = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInter = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInter);
      httpClient.interceptors.response.eject(resInter);
    };
  }, [reqInter, resInter]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};
