/**
 * Create a functting to get the data from the API
 * 1. The api endpoint is https://www.trade-tariff.service.gov.uk/api/v2/commodities
 * 2. It accepts a single parameter, the commodity code, which is a string
 * 3. It returns a promise which resolves to the data from the API
 * 5. The promise should reject if there is an error
 * 6. The promise should reject if the status code is not 200
 * 7. A successful promise returns a status 200
 * 8. An unsuccessful promise returns a status 404
 * 
 * 
 */

import axios from 'axios';

export const getCommodityData = async (commodityCode: string) => {
  return axios.get(`https://www.trade-tariff.service.gov.uk/api/v2/commodities/${commodityCode}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
      else if (response.status === 404) {
        return response.statusText
      } else {
        throw new Error('Error');
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export default getCommodityData;


