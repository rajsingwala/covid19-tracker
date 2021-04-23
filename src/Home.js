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
import Table from "./Table";
import { sortData } from "./util";
import Linegraph from "./Linegraph";
import "leaflet/dist/leaflet.css";
import { prettyStat, prettyStats } from "./util";

function Home() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [casesType, setCasesType] = useState("cases");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTabledata] = useState([]);
  const [mapCenter, setMapcenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapzoom] = useState(3);
  const [mapCountries, setMapcountries] = useState([]);

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios.get("https://disease.sh/v3/covid-19/all");
        setCountryInfo(res.data);
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
          "https://disease.sh/v3/covid-19/countries"
        );
        const countryInfo = country.data.map((country) => ({
          countryName: country.country,
          countryIso: country.countryInfo.iso3,
          countryFlag: country.countryInfo.flag,
        }));
        setCountries(countryInfo);
        const sortedData = sortData(country.data);
        setTabledata(sortedData);
        setMapcountries(country.data);
        console.log(country.data);
        console.log(sortedData);
      } catch (err) {
        console.log(err);
      }
    };
    getCountries();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    try {
      const res = await axios.get(url);
      setCountry(countryCode);
      setCountryInfo(res.data);
      setMapcenter([res.data.countryInfo.lat, res.data.countryInfo.long]);
      setMapzoom(4);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        {/*********************Header**************/}
        <div className="app__header">
          <h1>Covid-19 CASES</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">
                <ListItemAvatar>
                  <Avatar
                    src="https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015_960_720.jpg"
                    className="app__dropdown__flag"
                  />
                </ListItemAvatar>
                <span className="app__dropdown__name">Worldwide</span>
              </MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.countryIso}>
                  <ListItemAvatar>
                    <Avatar
                      src={country.countryFlag}
                      className="app__dropdown__flag"
                    />
                  </ListItemAvatar>
                  <span className="app__dropdown__name">
                    {country.countryName}
                  </span>
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

        {/****************map***************/}
        <div>
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        {/************map-end***************/}
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>
            Live Cases By <span className="app__title">Country</span>
          </h3>
          {/***************table*************/}
          <Table countries={tableData} />
          {/************table-end************/}

          <div className="app__chart">
            <h3>
              Worldwide New <span className="chart__title">{casesType}</span>
            </h3>
            <Linegraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
