import { Link } from "react-router-dom";

const TAG = 'CountryList';

export default function CountryList(props) {
  console.log(`${ TAG }.ctor()`);
  const countries = props.countries || [];

  let items = countries.map((country) => {
    return (
      <li key={ country.country_code } className="list-group-item" data-country-code={ country.country_code }>
        <Link to={ `/countries/${ country.country_code }` }>{ country.country_name }</Link>
        <small className="text-muted mx-2">({ country.country_code })</small>
      </li>
    )
  });

  return(
    <ul className="list-group">
      { items }
    </ul>
  );
}