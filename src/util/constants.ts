import { Dinner, Allergy, User, RegistrationUser, LoginUser } from './types';

// A default, emtpy dinner object
export const defaultDinner: Dinner = {
  dish: '',
  cuisine: '',
  date: '2021-03-15',
  location: '',
  owner: 1,
};

// A default, empty Allergy element
export const defaultAllergy: Allergy = {
  allergy: '',
};

// An empty, default User object
export const defaultUser: User = {
  username: '',
  first_name: '',
  last_name: '',
  address: '',
};

// A default registration user
export const defaultRegistrationUser: RegistrationUser = {
  username: '',
  first_name: '',
  last_name: '',
  address: '',
  password: ' ',
  password2: ' ',
};

// A default loginuser
export const defaultLoginUser: LoginUser = {
  username: '',
  password: '',
};
