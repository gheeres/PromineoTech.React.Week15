import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const TAG = 'LanguageSelect';
const service = new WorldService();

export default function LanguageSelect(props) {
  let language = props.language;
  const [ languages, setLanguages ] = useState(props.languages || []);

  useEffect(() => {
    service.getLanguages().then((languages) => {
      setLanguages(languages);
    });
  }, []);

  function handleOnChange(e) {
    const language = e.target.value;
    console.log(`${ TAG }.handleOnChange(${ language })`);
    if (props.onLanguageChange) {
      props.onLanguageChange(language);
    }
  }

  const options = languages.map((language) => {
    return <option key={ language.language_code } value={ language.language_code }>
             { language.language_name }
           </option>;
  });

  return (
    <select id={ props.id }className="form-select mt-2" aria-label="Select language" 
            onChange={ handleOnChange } value={ language }>
      <option value="">Select language</option>
      { options }
    </select>
  );
};