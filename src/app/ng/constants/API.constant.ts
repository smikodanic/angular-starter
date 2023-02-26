/**
 * List of API endpoints
 */
import { environment } from '../../../environments/environment';
const api_base_url = environment.api_base_url; // http://5.189.161.70:8001 or http://api-stage.example.com or https://api.example.com

const API = {
  BASE_URL: api_base_url,
  USERS: {
    register: api_base_url + '/panel/users/register',
    login: api_base_url + '/panel/users/login',
  },
  ADMIN: {
    test: api_base_url + '/panel/admin/test',
  },
  CUSTOMER: {
    test: api_base_url + '/panel/customer/test'
  }
};

export default API;
