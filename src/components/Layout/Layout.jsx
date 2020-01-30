import React from "react";
import PropTypes from "prop-types";

export const Layout = props => {
  return (
    <div className="container">
      <h1 className="py-2">Машинки</h1>
      {props.children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
