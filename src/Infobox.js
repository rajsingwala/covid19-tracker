import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const Infobox = ({ title, active, isRed, cases, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography className="infobox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infobox__cases ${!isRed && `infoBox--green`}`}>
          {cases}
        </h2>
        <Typography className="infobox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Infobox;
