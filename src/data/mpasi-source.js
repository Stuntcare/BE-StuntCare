const API_ENDPOINT = require('../globals/api-endpoint');

class MpasiSource {
  static async getAllMpasi() {
    const response = await fetch(API_ENDPOINT.MPASI);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailMpasi(id) {
    const response = await fetch(API_ENDPOINT.DETAILMPASI(id));
    return response.json();
  }

  static async searchMpasi(query) {
    const response = await fetch(API_ENDPOINT.SEARCHMPASI(query));
    const responseJson = await response.json();
    return responseJson;
  }

  static async kategoriMpasi(query) {
    const response = await fetch(API_ENDPOINT.KATEGORIMPASI(query));
    const responseJson = await response.json();
    return responseJson;
  }

  static async addMpasi(mpasiData) {
    const response = await fetch(API_ENDPOINT.MPASI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mpasiData),
    });

    const responseJson = await response.json();
    return responseJson;
  }

  static async updateMpasi(id, mpasiData) {
    const response = await fetch(API_ENDPOINT.DETAILMPASI(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mpasiData),
    });

    return response.json();
  }

  static async deleteMpasi(id) {
    const response = await fetch(API_ENDPOINT.DETAILMPASI(id), {
      method: 'DELETE',
    });

    return response.json();
  }
}

module.exports = MpasiSource;
