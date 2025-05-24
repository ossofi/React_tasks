import { useCallback } from 'react';

const useFetch = () => {
  const storeLog = (entry) => {
    const logs = JSON.parse(localStorage.getItem('myApp_apiLogs')) || [];
    logs.push(entry);
    localStorage.setItem('myApp_apiLogs', JSON.stringify(logs));
  };

  const sendRequest = useCallback(async (url, options = {}) => {
    let requestBody = null;

    if (options.body) {
      try {
        requestBody = JSON.parse(options.body);
      } catch {
        requestBody = options.body;
      }
    }

    try {
      const response = await fetch(url, options);
      const statusCode = response.status;
      const data = await response.json();

      storeLog({
        timestamp: new Date().toISOString(),
        url,
        method: options.method || 'GET',
        requestBody,
        statusCode,
      });

      return data;
    } catch (err) {
      storeLog({
        timestamp: new Date().toISOString(),
        url,
        method: options.method || 'GET',
        requestBody,
        statusCode: 'ERROR',
        error: err.message,
      });

      throw err;
    }
  }, []);

  return sendRequest;
};

export default useFetch;
