import React from "react";
import PropTypes from "prop-types";
import Pagination from "react-pagination-bootstrap";

export const CarPagination = ({
  currentPage = 0,
  itemsPerPage,
  total,
  handlePageChange
}) => (
  <div className="d-flex justify-content-center">
    <Pagination
      activePage={currentPage + 1}
      itemsCountPerPage={itemsPerPage}
      totalItemsCount={total}
      pageRangeDisplayed={5}
      onChange={pageNumber => {
        handlePageChange(pageNumber - 1);
      }}
    />
  </div>
);

CarPagination.propTypes = {
  currentPage: PropTypes.number,
  total: PropTypes.number,
  itemsPerPage: PropTypes.number,
  handlePageChange: PropTypes.func
};
