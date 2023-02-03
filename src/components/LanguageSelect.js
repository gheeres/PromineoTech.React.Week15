import { useEffect, useState } from "react";
import WorldService from "../services/WorldService";

const service = new WorldService();
const TAG = 'LanguageSelect';

export default function LanguageSelect(props) {
  const [ languages, setLanguages ] = useState(props.languages || []);

  useEffect(() => {
    service.getLanguages().then((result) => {
      setLanguages(result);
    });
  }, []);

  function handleChange(e) {
    console.log(`${ TAG }.handleChange(${ e.target.value })`);
    const language = e.target.value;
    if (props.onLanguageChange) {
      props.onLanguageChange(language);
    }
  }

  const options = languages.map((language) => {
    return <option key={ language.language_code } 
                   value={ language.language_code }>
             { language.language_name }
           </option>

  });

  return (
    <select className="form-select mt-2" onChange={ handleChange }>
      <option value="">Select Language</option>
      { options }
    </select>
  );
};