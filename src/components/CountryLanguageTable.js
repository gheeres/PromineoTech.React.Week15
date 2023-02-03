import { useState, useEffect } from "react";
import WorldService from "../services/WorldService";

const TAG = 'CountryLanguageTable';
const service = new WorldService();

export default function CountryLanguageTable(props) {
  console.log(`${ TAG }.render(${ JSON.stringify(props) })`);
  const [ countries, setCountries ] = useState(props.countries || []);

  useEffect(() => {
    service.getCountriesThatSpeakLanguage(props.language).then((countries) => {
      setCountries(countries);
    });
  }, [ props.language ]);

  function handleOnDelete() {
  }

  function handleOnEdit() {
  }

  const rows = countries.map((country) => {
    console.log(country);
    return (
      <tr key={ country.country_code } data-country-code={ country.country_code }>
        <td>{ country.country_code }</td>
        <td>{ country.country_name }</td>
        <td className="text-center">{ country.is_official ? <i className="bi bi-check-circle-fill"></i> : '' }</td>
        <td className="text-end">{ country.language_percentage.toFixed(1) || '' }%</td>
        <td className="text-end">
          <i data-country-code={ country.country_code } className="text-primary bi bi-pencil-square" onClick={ handleOnEdit }></i>
          <i data-country-code={ country.country_code } className="text-danger bi bi-trash" onClick={ handleOnDelete }></i>
        </td>        
      </tr>
    );
  });

  return(
    <table className={ `table table-striped table-hover${ (! countries.length) ? ' d-none' : '' }` }>
     <caption>{ (countries.length) ? countries.length : 'No' } countries</caption>
     <thead>
       <tr>
         <th className="col-2">Code</th>
         <th className="col-5">Country</th>
         <th className="text-center col-1">Official?</th>
         <th className="text-end col-2">Percentage</th>
         <th className="text-end col-1"></th>
       </tr>
     </thead>
     <tbody>
       { rows }
     </tbody>
    </table>
  );
}