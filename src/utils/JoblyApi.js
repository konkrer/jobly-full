import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    console.debug('API Call:', endpoint, paramsOrData, verb);

    try {
      return (
        await axios({
          method: verb,
          url: `${BASE_URL}/${endpoint}`,
          [verb === 'get' ? 'params' : 'data']: paramsOrData,
        })
      ).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('API Error:', err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
      return err.response;
    }
  }

  //** Company API methods */
  static async getCompanies(queryParams) {
    let res = await this.request(`companies`, queryParams);
    return res.companies;
  }

  static async getCompany(handle, params) {
    let res = await this.request(`companies/${handle}`, params);
    return res;
  }

  //** Job API methods */
  static async getJobs(params) {
    let res = await this.request(`jobs`, params);
    return res.jobs;
  }

  static async applyJob(id, data) {
    let res = await this.request(`jobs/${id}/apply`, data, 'post');
    return res;
  }

  //** User API methods */
  static async getProfile(username, params) {
    let res = await this.request(`users/${username}`, params);
    return res.user;
  }

  static async addProfile(data) {
    try {
      const res = await this.request(`users`, data, 'post');
      return res;
    } catch (error) {
      console.error('addProfile error', error);
    }
  }

  static async updateProfile(username, data) {
    try {
      const res = await this.request(`users/${username}`, data, 'patch');
      return res;
    } catch (error) {
      console.error('updateProfile error', error);
    }
  }

  //** Auth API methods */
  static async login(data) {
    try {
      const res = await this.request('login', data, 'post');
      return res;
    } catch (error) {
      console.error('login error', error);
    }
  }
}

export default JoblyApi;
