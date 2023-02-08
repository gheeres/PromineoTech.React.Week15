import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const TAG = 'CountrySelect';
const service = new WorldService();

export default function CountrySelect(props) {
  let country = props.country;
  let disabled = props.disabled || false;
  let [ countries, setCountries ] = useState(props.countries || []);

  useEffect(() => {
    service.getCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);
  
  function handleOnChange(e) {
    const country = e.target.value;
    console.log(`${ TAG }.handleOnChange(${ country })`);
    if (props.onChange) {
      props.onChange(country, e)
    }
  }

  const options = countries.map((country) => {
    return <option key={ country.country_code } value={ country.country_code }>
             { country.country_name }
           </option>;
  });

  return (
    <select id={ props.id } className="form-select mt-2" disabled={ disabled } aria-label="Select country" 
            onChange={ handleOnChange } value={ country }>
      <option value="">Select country...</option>
      { options }
    </select>
  );
};