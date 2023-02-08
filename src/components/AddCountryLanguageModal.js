import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import CountrySelect from "./CountrySelect";

const TAG = 'AddCountryLanguageModal';

export default function AddCountryLanguageModal(props) {
  let language = props.language;
  let country = props.country;
  const [modal, setModal] = useState([]);
  const modalRef = useRef();
  const title = props.title || 'Add Country';

  useEffect(() => {
    const modal = new Modal(modalRef.current, { keyboard: false });
    setModal(modal);
    modal.show();
  }, [])

  function handleClose(e) {
    modal.hide();
    if (props.onClose) {
      props.onClose(modalRef);
    }
  }

  return(
    <div className="py-2">
      <div className="modal" tabIndex="-1" ref={ modalRef }>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ title }</h5>
              <button type="button" className="btn-close" onClick={ handleClose } data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="mb-3">
                  <label htmlFor="country_code">Country:</label>
                  <CountrySelect id="country_code" country={ country } />
                </div>
                <div className="mb-3">
                  <label htmlFor="language_percentage" className="form-label">Percentage:</label>
                  <input type="number" className="form-control" min="0" max="100" step="0.1" id="language_percentage" />
                </div>
                <div className="mb-3 form-check">
                  <input id="is_official" type="checkbox" className="form-check-input" />
                  <label className="form-check-label" htmlFor="is_official">Is Official</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={ handleClose } type="button" className="btn btn-outline-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
