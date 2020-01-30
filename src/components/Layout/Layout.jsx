import React from "react";
import PropTypes from "prop-types";

export const Layout = props => {
  return <div className="container">{props.children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node
};
