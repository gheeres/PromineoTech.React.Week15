import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import LanguageSelect from "./LanguageSelect";
import CountrySelect from "./CountrySelect";
import WorldService from "../services/WorldService";

const TAG = 'CountryLanguageModal';
const service = new WorldService();

export default function CountryLanguageModal(props) {
  const [ country, setCountry ] = useState(props.country);
  const [ language, setLanguage ] = useState(props.language);
  const [ detail, setDetail ] = useState({});
  const [ modal, setModal ] = useState(null);
  const modalRef = useRef(); 
  const title = props.title || 'Add Detail';

  useEffect(() => {
    const modal = new Modal(modalRef.current, { keyboard: false });
    setModal(modal);
    modal.show();
  }, [])
  useEffect(() => {
    service.getLangageDetailForCountry(props.country, props.language).then((detail) => {
      setDetail(detail);
    });
  }, [ props.country, props.language ])

  function handleClose(e) {
    modal.hide();
    if (props.onClose) {
      props.onClose(modalRef);
    }
  }

  function handleSave(e) {
    let modal = e.target.closest('.modal');
    let input = {
      language_percentage: parseFloat(modal.querySelector('#language_percentage').value) || null,
      is_official: modal.querySelector('#is_official').checked || false
    };
    console.log(`${ TAG }.handleSave(${ country },${ language }): Saving... ${ JSON.stringify(input) }...`);

    if (props.country) {
      service.updateLanguageDetailForCountry(country, language, input).then((res) => {
        if (res.code === 200) {
          if (props.onSave) {
            props.onSave(res, e);
          }
        }
        handleClose(e);
      });
    }
    else {
      input = { ...input, language_code: language };
      service.addLanguageDetailForCountry(country, input).then((res) => {
        if (res.code === 200) {
          if (props.onSave) {
            props.onSave(res, e);
          }
        }
        handleClose(e);
      });
    }
  }
  
  function handleCountryChange(country, e) {
    console.log(`${ TAG }.handleCountryChange(${ country })`);
    if (country) {
      setCountry(country);
    }
  }

  function handleLanguageChange(handleLanguageChange, e) {
    console.log(`${ TAG }.handleLanguagehange(${ language })`);
    if (language) {
      setLanguage(language);
    }
  }

  return(
    <div className="py-2">
      <div className="modal" tabIndex="-1" ref={ modalRef }>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ title }</h5>
              <button type="button" className="btn-close" onClick={ handleClose } data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="mb-3">
                  <label htmlFor="languge_code">Language:</label>
                  <LanguageSelect id="languge_code" disabled={ ((language) && (language !== '')) } language={ language } onChange={ handleLanguageChange } />
                </div>
                <div className="mb-3">
                  <label htmlFor="country_code">Country:</label>
                  <CountrySelect id="country_code" disabled={ ((country) && (country !== ''))} country={ country } onChange={ handleCountryChange } />
                </div>
                <div className="mb-3">
                  <label htmlFor="language_percentage" className="form-label">Percentage:</label>
                  <input type="number" className="form-control" min="0" max="100" step="0.1" id="language_percentage" defaultValue={ detail?.language_percentage } />
                </div>
                <div className="mb-3 form-check">
                  <input id="is_official" type="checkbox" className="form-check-input" defaultChecked={ detail?.is_official } />
                  <label className="form-check-label" htmlFor="is_official">Is Official</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={ handleClose } type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal" aria-label="Cancel">
                Cancel
              </button>
              <button onClick={ handleSave } type="button" className="btn btn-primary btn-save" disabled={ country ? '' : 'disabled' }>
                Save &nbsp; <i className="bi bi-save"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
