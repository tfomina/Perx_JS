import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "./../Layout";
import { CarTable as Table } from "./../Table";
import { CarPagination as Pagination } from "./../Pagination";
import { Loader } from "./../Loader";
import { fetch } from "./../../api";

const ITEMS_PER_PAGE = 10;

export const App = () => {
  const { data, isLoading, isError } = useSelector(state => state);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetch(currentPage, ITEMS_PER_PAGE));
  }, [currentPage]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      {isError && <div>Что-то пошло не так...</div>}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table data={data.cars} />
          <Pagination
            currentPage={currentPage}
            total={+data.total}
            itemsPerPage={ITEMS_PER_PAGE}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </Layout>
  );
};
