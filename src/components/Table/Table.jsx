import React from "react";
import PropTypes from "prop-types";

export const Table = ({ data }) => (
  <table class="table table-striped table-bordered">
    <thead class="thead-dark">
      <tr>
        <th scope="col">VIN</th>
        <th scope="col">Brand</th>
        <th scope="col">Model</th>
        <th scope="col">Grade</th>
        <th scope="col">Дилер</th>
        <th scope="col">Адрес дилера</th>
      </tr>
    </thead>
    <tbody>
      {data.map(i => (
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  data: PropTypes.array
};
