import React from "react";
import PropTypes from "prop-types";

export const DealerAdressList = ({ data = [] }) => (
  <>
    {data && data.length ? (
      <ul className="list-group list-group-flush">
        {data.map(i => (
          <li className="list-group-item bg-transparent" key={i.id}>
            {i.address}
          </li>
        ))}
      </ul>
    ) : (
      ""
    )}
  </>
);

DealerAdressList.propTypes = {
  data: PropTypes.array
};
