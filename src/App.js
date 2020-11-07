import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import headerImage from './images/image.png'

function App() {
  const [data, setData] = useState({});
  const [countryData, setCountryData] = useState("");

  // Function to dynamically update selected coountry in Country picker Component
  const handleCountryChange = async (selectedCountry) => {
    const fetchNewData = await fetchData(selectedCountry);
    setData(fetchNewData);
    setCountryData(selectedCountry);
    // console.log(countryData)
  };

  const getData = async () => {
    const info = await fetchData();
    setData(info);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={headerImage} alt="Image of Covid 19" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={countryData} />
    </div>
  );
}

export default App;
