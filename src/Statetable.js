import { Avatar } from "@material-ui/core";
import numeral from "numeral";
import React from "react";

const Statetable = ({ countries }) => {
  return (
    <div className="state_table">
      {countries.map(({ state, cases }) => (
        <tr>
          <td>{state}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Statetable;
