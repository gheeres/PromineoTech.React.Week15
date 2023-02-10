import { useState, useEffect, useCallback } from 'react';
import LanguageSelect from '../components/LanguageSelect';
import CountryLanguageTable from '../components/CountryLanguageTable';
import WorldService from '../services/WorldService';
import CountryLanguageModal from '../components/CountryLanguageModal';

const TAG = 'Languages';
const service = new WorldService();

export default function Languages(props) {
  const [ language, setLanguage ] = useState('ENG');
  const [ countries, setCountries ] = useState([]);
  const [ forced, updateState ] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [ modal, setModal ] = useState();

  useEffect(() => {
    service.getCountriesThatSpeakLanguage(language).then((countries) => {
      setCountries(countries);
    });
  }, [ language, forced ]);

  function handleLanguageChange(language, e) {
    console.log(`${ TAG }.handleLanguageChange(${ JSON.stringify(language) })`);
    setLanguage(language);
  }

  function handleCountryDelete(country, language, e) {
    console.log(`${ TAG }.handleCountryDelete(${ JSON.stringify(country) },${ JSON.stringify(language) })`);
    service.deleteLanguageDetailFromCountry(country, language).then((response) => {
      forceUpdate();
    });
  }
  function handleCountryEdit(country, language, detail, e) {
    console.log(`${ TAG }.handleCountryEdit(${ JSON.stringify(country) },${ JSON.stringify(language) },${ JSON.stringify(detail) })`);
    setModal(<CountryLanguageModal language={ language } country={ country }
                                   countries={ countries.map((c) => c.country_code) }
                                   onSave={ handleModalSave }
                                   onClose={ handleModalClose } />);
  }
  function handleCountryAdd(language, countries, e) {
    //console.log(`${ TAG }.handleCountryAdd(${ JSON.stringify(language) },${ JSON.stringify(countries) })`);
    setModal(<CountryLanguageModal language={ language } country={ '' }
                                   countries={ countries.map((c) => c.country_code) }
                                   onSave={ handleModalSave }
                                   onClose={ handleModalClose } />);
  }

  function handleModalSave(country, language, input, original, e) {
    console.log(`${ TAG }.handleModalSave(${ JSON.stringify(country) },${ JSON.stringify(language) },${ JSON.stringify(input) },${ JSON.stringify(original) },${ e?.target })`);
    if (original?.language_code === language) {
      return service.updateLanguageDetailForCountry(country, language, input).then((res) => {
        forceUpdate();
        return true; 
      });
    }
    else {
      return service.addLanguageDetailForCountry(country, { ...input, language_code: language }).then((res) => {
        forceUpdate();
        return true;
      });
    }
  }

  function handleModalClose(e) {
    console.log(`${ TAG }.handleModalClose(${ e?.target })`);
    setModal();
  }

  return (
    <>
      <h1>Languages</h1>
      <div className="row">
        Language: <LanguageSelect language={ language } onChange={ handleLanguageChange } />
      </div>
      <hr />
      <CountryLanguageTable language={ language } countries={ countries }
                            onDelete={ handleCountryDelete } onEdit={ handleCountryEdit }
                            onAdd={ handleCountryAdd } />
      { modal }
    </>
  );
}