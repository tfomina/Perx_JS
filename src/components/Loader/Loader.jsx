import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const Loader = () => (
  <div className="d-flex justify-content-center">
    <Spinner animation="border" role="status" variant="primary">
      <span className="sr-only">Загрузка...</span>
    </Spinner>
  </div>
);
