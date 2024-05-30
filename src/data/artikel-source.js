const API_ENDPOINT = require('../globals/api-endpoint');

class ArtikelSource {
  static async getAllArtikel() {
    const response = await fetch(API_ENDPOINT.ARTIKEL);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailArtikel(id) {
    const response = await fetch(API_ENDPOINT.DETAILARTIKEL(id));
    return response.json();
  }

  static async searchArtikel(query) {
    const response = await fetch(API_ENDPOINT.SEARCHARTIKEL(query));
    const responseJson = await response.json();
    return responseJson;
  }

  static async kategoriArtikel(query) {
    const response = await fetch(API_ENDPOINT.KATEGORIARTIKEL(query));
    const responseJson = await response.json();
    return responseJson;
  }

  static async createArtikel(artikelData) {
    const response = await fetch(API_ENDPOINT.ARTIKEL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artikelData),
    });

    const responseJson = await response.json();
    return responseJson;
  }

  static async updateArtikel(id, artikelData) {
    const response = await fetch(API_ENDPOINT.DETAILARTIKEL(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artikelData),
    });

    return response.json();
  }

  static async deleteArtikel(id) {
    const response = await fetch(API_ENDPOINT.DETAILARTIKEL(id), {
      method: 'DELETE',
    });

    return response.json();
  }
}

module.exports = ArtikelSource;
