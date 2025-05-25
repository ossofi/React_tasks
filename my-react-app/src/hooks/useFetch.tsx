import { useCallback } from 'react';

export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

type LoggerFunction<T extends AsyncFunction> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T>>;

const useFetch = () => {
  const withLogger = useCallback(<T extends AsyncFunction>(fn: T): LoggerFunction<T> => {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      try {
        console.log(`Calling ${fn.name} with:`, args);
        const result = await fn(...args);
        console.log(`${fn.name} result:`, result);
        return result;
      } catch (error) {
        console.error(`${fn.name} error:`, error);
        throw error;
      }
    };
  }, []);

  return withLogger;
};

export default useFetch;