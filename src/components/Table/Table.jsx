import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { DealerAdressList } from "./DealerAdressList";

export const CarTable = ({ data = [] }) => (
  <>
    {data && data.length ? (
      <Table striped bordered>
        <thead className="thead-dark">
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
          {data.map(item => (
            <tr key={item.id}>
              <th scope="row">{item.vin}</th>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.grade}</td>
              <td>{item.dealerInfo.name}</td>
              <td>
                <DealerAdressList data={item.dealerInfo.offices} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      "Ничего не найдено"
    )}
  </>
);

Table.propTypes = {
  data: PropTypes.array
};
