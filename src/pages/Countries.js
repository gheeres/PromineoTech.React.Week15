import { useState, useEffect } from "react";
import CountryList from "../components/CountryList";
import WorldService from "../services/WorldService";

const TAG = 'Countries';
const service = new WorldService();

export default function Countries(props) {
  console.log(`${ TAG }.ctor()`);
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    service.getCountries().then((result) => {
      setCountries(result);
    });
  }, []);

  return(
    <>
      <h2>Countries</h2>
      <CountryList countries={ countries } />
    </>
  );
}