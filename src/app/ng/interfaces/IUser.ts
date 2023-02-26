interface IUser {
  _id?: string;

  first_name: string;
  last_name: string;
  address?: string;
  city?: string;
  country?: string;

  phone?: string;
  email: string;
  website?: string;


  username: string;
  password: string;

  role: 'admin' | 'customer';
  is_active: boolean;
}

export { IUser };
