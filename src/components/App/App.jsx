import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Layout } from "./../Layout";
import { Table } from "./../Table";
import { Pagination } from "./../Pagination";
import { Loader } from "./../Loader";

const PER_PAGE = 10;

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
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

  const fetchDealers = async dealerIds => {
    return await axios(
      `https://jlrc.dev.perx.ru/carstock/api/v1/dealers/?id__in=${dealerIds}`
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_PENDING" });
      try {
        const carResult = await axios(url, {
          headers: {
            "X-CS-Dealer-Id-Only": 1
          }
        });
        const dealerIds = (carResult.data || []).map(i => i.dealer);
        const uniqueSet = new Set(dealerIds);
        const uniqueDealerIds = [...uniqueSet];
        const uniqueDealerIdsString = uniqueDealerIds.join();

        const dealerResult = await fetchDealers(uniqueDealerIdsString);

        const cars = carResult.data.map(c => ({
          ...c,
          dealerInfo: dealerResult.data.find(d => c.dealer === d.id)
        }));

        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            cars: cars,
            total: carResult.headers["x-total-count"]
          }
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, [url]);

  return [state, setUrl];
};

export const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [
    { data, isLoading, isError },
    doFetch
  ] = useDataApi(
    `https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&page=${currentPage}&per_page=${PER_PAGE}`,
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
          <Pagination currentPage={currentPage} total={data.total} />
        </>
      )}
    </Layout>
  );
};
