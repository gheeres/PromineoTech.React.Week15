const defaultUrl = 'http://localhost:3000';

/**
 * Service for interacting with cities, countries and languages of the world.
 */
export default class WorldService {
  #languages = [];
  #countries = [];

  /**
   * Creates an instance of the WorldService class.
   * @param {string} url The optional base url of the service.
   */
  constructor(url) {
    this.url = url || defaultUrl;
  }

  /**
   * Retrieves all countries that speak the specified language.
   * @param {string} language The unique language code.
   * @returns {Array.CountryLanguageDetail} The list of countries / language details.
   */
  async getCountriesThatSpeakLanguage(language) {
    if (! language) {
      return [];
    }

    const url = `${ this.url }/languages/${ language }/countries`
    console.log(`Requesting data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                       return json.map(c => {
                        return {
                          country_code: c.country.country_code,
                          country_name: c.country.country_name,
                          is_official: c.is_official,
                          language_percentage: c.language_percentage
                        };
                       });
                     });
  }

  /**
   * Retrieves all of the available languages.
   * @returns {Array.Language} The list of known languages.
   */
  async getLanguages() {
    if ((this.#languages || []).length) {
      return this.#languages;
    }

    const url = `${ this.url }/languages`
    console.log(`Requesting data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                      this.#languages = json;
                       return this.#languages;
                     });
  }

  /**
   * Retrieves all of the available countries.
   * @returns {Array.Country} The list of known countries.
   */
  async getCountries() {
    if ((this.#countries || []).length) {
      return this.#countries;
    }

    const url = `${ this.url }/countries`
    console.log(`Requesting data from: ${ url }...`);
    return fetch(url).then(res => res.json())
                     .then((json) => {
                       this.#countries = json;
                       return this.#countries;
                     });
  }
}