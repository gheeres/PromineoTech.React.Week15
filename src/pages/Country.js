import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorldService from "../services/WorldService";

const TAG = 'Country';
const service = new WorldService();

export default function Country(props) {
  console.log(`${ TAG }.ctor()`);

  const { country : country_code } = useParams();
  const [ country, setCountry ] = useState({});

  useEffect(() => {
    service.getCountry(country_code).then((result) => {
      setCountry(result);
    });
  }, [ country_code ]);

  return(
    <>
      <h2>{ country.country_name } <small>({ country.country_code })</small></h2>
      <div className="row">
        <label className="col-2">Capital</label>
        <span className="col-10">{ country.capital?.city_name }</span>
      </div>
      <div className="row">
        <label className="col-2">Population</label>
        <span className="col-10">{ country.country_population?.toLocaleString() }</span>
      </div>
    </>
  );
}