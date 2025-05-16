import { useCallback } from 'react';

const useFetch = () => {
  const withLogger = useCallback(fn => {
    return async (...args) => {
      const body = JSON.stringify(args);
      try {
        const res = await fn(...args);
        localStorage.setItem('fetch_log', JSON.stringify({
          body,
          status: 'success',
          result: res,
        }));
        console.log('log', ...args, res);
        return res;
      } catch (err) {
        localStorage.setItem('fetch_log', JSON.stringify({
          body,
          status: 'error',
          error: err.message,
        }));
        console.error('log error', ...args, err);
        throw err;
      }
    };
  }, []);

  return withLogger;
};

export default useFetch;
