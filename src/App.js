import { useState, useEffect, useCallback } from 'react';
import './App.css';
import LanguageSelect from './components/LanguageSelect';
import CountryLanguageTable from './components/CountryLanguageTable';
import WorldService from './services/WorldService';

const TAG = 'App';
const service = new WorldService();

export default function App() {
  const [ forced, updateState ] = useState();
  const [ language, setLanguage ] = useState('ENG');
  const [ countries, setCountries ] = useState([]);
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    //console.log(`${ TAG }.useEffect(language:${ language })`);
    service.getCountriesThatSpeakLanguage(language).then((countries) => {
      setCountries(countries);
    });
  }, [ language, forced ]);

  function handleLanguageChange(language, e) {
    console.log(`${ TAG }.handleLanguageChange(${ JSON.stringify(language) })`);
    setLanguage(language);
  }

  function handleCountryDelete(country, e) {
    //console.log(`${ TAG }.handleCountryDelete(${ JSON.stringify(country) })`);
    service.deleteLanguageDetailFromCountry(country, language).then((response) => {
      forceUpdate();
    });
  }
  function handleCountryEdit(country, e) {
    //console.log(`${ TAG }.handleCountryEdit(${ JSON.stringify(country) })`);
    forceUpdate();
  }
  function handleLanguageAdd(response, e) {
    //console.log(`${ TAG }.handleLanguageAdd(${ JSON.stringify(response) })`);
    forceUpdate();
  }

  return (
    <>
      <h1>Around the world... so many countries... so many languages!</h1>
      <div className="row">
        Language: <LanguageSelect language={ language } onChange={ handleLanguageChange } />
      </div>
      <hr />
      <CountryLanguageTable language={ language } countries={ countries }
                            onDelete={ handleCountryDelete } onEdit={ handleCountryEdit }
                            onAdd={ handleLanguageAdd } />
    </>
  );
}