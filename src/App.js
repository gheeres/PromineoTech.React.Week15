import { useState, useEffect } from 'react';
import './App.css';
import LanguageSelect from './components/LanguageSelect';
import CountryLanguageTable from './components/CountryLanguageTable';
import WorldService from './services/WorldService';

const TAG = 'App';
const service = new WorldService();

export default function App() {
  const [ language, setLanguage ] = useState('ENG');
  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    service.getCountriesThatSpeakLanguage(language).then((countries) => {
      setCountries(countries);
    });
  }, [ language ]);

  function handleLanguageChange(language) {
    console.log(`${ TAG }.handleLanguageChange(${ JSON.stringify(language) })`);
    setLanguage(language);
  }

  function handleCountryDelete(country) {
    console.log(`${ TAG }.handleCountryDelete(${ JSON.stringify(country) })`);
    service.getCountriesThatSpeakLanguage(language).then((countries) => {
      setCountries(countries);
    });
  }
  function handleCountryEdit(country) {
    console.log(`${ TAG }.handleCountryEdit(${ JSON.stringify(country) })`);
    setLanguage(language);
  }

  return (
    <>
      <h1>Around the world... so many countries... so many languages!</h1>
      <div className="row">
        Language: <LanguageSelect language={ language } 
                                  onLanguageChange={ handleLanguageChange } />
      </div>
      <hr />
      <CountryLanguageTable language={ language } countries={ countries }
                            onDelete={ handleCountryDelete } onEdit={ handleCountryEdit } />
    </>
  );
}