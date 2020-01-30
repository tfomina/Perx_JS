import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Layout } from "./../Layout";
import { Table } from "./../Table";
import { Pagination } from "./../Pagination";
import { Loader } from "./../Loader";

const PER_PAGE = 10;

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CARS_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_CARS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_CARS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_CARS_PENDING" });
      try {
        const result = await axios(url, {
          headers: {
            "X-CS-Dealer-Id-Only": 1
          }
        });
        dispatch({
          type: "FETCH_CARS_SUCCESS",
          payload: {
            cars: result.data,
            total: result.headers["x-total-count"]
          }
        });
      } catch (error) {
        dispatch({ type: "FETCH_CARS_FAILURE" });
      }
    };
    fetchData();
  }, [url]);

  return [state, setUrl];
};

export const App = () => {
  const [page, setPage] = useState(1);
  const [
    { data, isLoading, isError },
    doFetch
  ] = useDataApi(
    `https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&page=${page}&per_page=${PER_PAGE}`,
    { cars: [], total: 0 }
  );

  return (
    <Layout>
      {isError && <div>Что-то пошло не так...</div>}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table data={data.cars} />
          <Pagination />
        </>
      )}
    </Layout>
  );
};
