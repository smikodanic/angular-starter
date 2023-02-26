import { environment } from '../../../environments/environment';

const AUTH_URLS = {
  apiLoginUrl: `${environment.api_base_url}/panel/users/login`,
  afterGoodLogin: '/{loggedUserRole}', // {loggedUserRole} -> 'admin' | 'customer'
  afterBadLogin: '/login',
  afterLogout: '/login'
};

export default AUTH_URLS;
