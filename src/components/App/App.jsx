import React, { useState } from "react";
import { Layout } from "./../Layout";
import { Table } from "./../Table";
import { Pagination } from "./../Pagination";
import { Loader } from "./../Loader";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table data={[]} />
          <Pagination />
        </>
      )}
    </Layout>
  );
};
