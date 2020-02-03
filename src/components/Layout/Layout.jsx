import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";

export const Layout = props => {
  return (
    <Container className="pb-4">
      <h1 className="py-3">Машины</h1>
      <main>{props.children}</main>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
