import { useState, useEffect, useCallback } from "react";
import { api } from "../utils/axios";
import { AxiosRequestConfig } from "axios";
import { FetchState } from "../types";

const useFetch = <T>(url: string, options: AxiosRequestConfig = {}) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(
    async (config: AxiosRequestConfig = {}) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const mergedConfig = { ...options, url, ...config };
        const response = await api.request<T>(mergedConfig);
        setState({ data: response.data, loading: false, error: null });
        return response.data;
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: "An error occurred while fetching data",
        });
        throw error;
      }
    },
    [url, JSON.stringify(options)]
  );

  useEffect(() => {
    if (options.method === "GET" || !options.method) {
      fetchData();
    }
  }, [fetchData]);

  return { ...state, fetchData };
};

export default useFetch;
