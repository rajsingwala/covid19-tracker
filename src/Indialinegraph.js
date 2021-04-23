import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const chartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDatapoint;

  for (let date in data.cases) {
    if (lastDatapoint) {
      const newData = {
        x: date,
        y: data[casesType][date] - lastDatapoint,
      };
      chartData.push(newData);
    }
    lastDatapoint = data[casesType][date];
  }
  console.log(chartData);
  return chartData;
};

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 2,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const Indialinegraph = ({ casesType }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get(
          "https://disease.sh/v3/covid-19/historical/India?lastdays=30"
        );
        console.log(res.data.timeline);
        const buildData = chartData(res.data.timeline, casesType);
        setData(buildData);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, [casesType]);

  return (
    <div className="linegraph">
      {data?.length > 0 && (
        <Line
          height={235}
          options={options}
          data={{
            datasets: [
              {
                label: "people",
                backgroundColor: "rgb(204,100,51,0.5)",
                borderColor: "#CC1034",
                data: data,
                fill: true,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default Indialinegraph;
