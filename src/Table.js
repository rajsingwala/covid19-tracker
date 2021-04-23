import { Avatar } from "@material-ui/core";
import numeral from "numeral";
import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo }) => (
        <tr>
          <div className="table__left">
            <td>
              <Avatar src={countryInfo.flag} className="table__flag" />
            </td>
            <td>{country}</td>
          </div>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
