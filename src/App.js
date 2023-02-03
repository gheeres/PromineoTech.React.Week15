import { useState } from 'react';
import './App.css';
import LanguageSelect from './components/LanguageSelect';
import CountryLanguageTable from './components/CountryLanguageTable';

const TAG = 'App';

export default function App() {
  const [ language, setLanguage ] = useState('');

  function handleLanguageChange(language) {
    console.log(`${ TAG }.handleLanguageChange(${ JSON.stringify(language) })`);
    setLanguage(language);
  }

  return (
    <>
      <h1>Around the world... so many countries... so many languages!</h1>
      <div className="row">
        Language: <LanguageSelect onLanguageChange={ handleLanguageChange } />
      </div>
      <hr />
      <CountryLanguageTable language={ language } />
    </>
  );
}