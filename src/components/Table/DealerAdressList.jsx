import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";

export const DealerAdressList = ({ data = [] }) => (
  <>
    {data && data.length ? (
      <ListGroup variant="flush">
        {data.map(i => (
          <ListGroup.Item className="bg-transparent" key={i.id}>
            {i.address}
          </ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      ""
    )}
  </>
);

DealerAdressList.propTypes = {
  data: PropTypes.array
};
