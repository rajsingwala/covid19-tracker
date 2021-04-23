import {
  Avatar,
  FormControl,
  ListItemAvatar,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Infobox from "./Infobox";
import Map from "./Map";
import Statetable from "./Statetable";
import { sortData } from "./util";
import Indialinegraph from "./Indialinegraph";
import "leaflet/dist/leaflet.css";
import { prettyStat, prettyStats } from "./util";

function India() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("India");
  const [casesType, setCasesType] = useState("cases");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTabledata] = useState([]);
  const [mapCenter, setMapcenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapzoom] = useState(3);
  const [mapCountries, setMapcountries] = useState([]);

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get(
          "https://disease.sh/v3/covid-19/gov/India?allowNull=true"
        );
        setCountryInfo(res.data.total);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const country = await axios.get(
          "https://disease.sh/v3/covid-19/gov/India?allowNull=true"
        );
        const countryInfo = country.data.states.map((country) => ({
          countryName: country.state,
        }));
        setCountries(countryInfo);
        const sortedData = sortData(country.data.states);
        setTabledata(sortedData);
        // setMapcountries(country.data.states);
        console.log(country.data);
        // console.log(sortedData);
      } catch (err) {
        console.log(err);
      }
    };
    getCountries();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    try {
      const res = await axios.get(
        "https://disease.sh/v3/covid-19/gov/India?allowNull=true"
      );
      setCountry(countryCode);
      countryCode === "India"
        ? setCountryInfo(res.data.total)
        : res.data.states.map((state) => {
            countryCode === state.state && setCountryInfo(state);
          });
      //   setCountryInfo(res.data);
      console.log(res.data);
      //   setMapcenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      //   setMapzoom(4);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app__india">
      <div className="app__left__india">
        {/*********************Header**************/}
        <div className="app__header">
          <h1>Covid-19 CASES</h1>
          <FormControl className="app__dropdown2">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="India">India</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.countryName}>
                  {country.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/*************header-end*********/}

        {/***********info-boxes************/}
        <div className="app__stats">
          <Infobox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="CoronaVirus Cases"
            total={prettyStats(countryInfo.cases)}
            cases={prettyStat(countryInfo.todayCases)}
            className="box"
          />

          <Infobox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            total={prettyStats(countryInfo.recovered)}
            cases={prettyStat(countryInfo.todayRecovered)}
            className="box"
          />
          <Infobox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={prettyStats(countryInfo.deaths)}
            cases={prettyStat(countryInfo.todayDeaths)}
            className="box"
          />
        </div>
        {/**********info-boxes-end*********/}

        <div className="india__chart">
          <h2>
            India New <span className="chart__title">{casesType}</span>
          </h2>
          <Indialinegraph casesType={casesType} />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>
            Live Cases By <span className="app__title">State</span>
          </h3>
          {/***************table*************/}
          <Statetable countries={tableData} />
          {/************table-end************/}
        </CardContent>
      </Card>
    </div>
  );
}

export default India;
