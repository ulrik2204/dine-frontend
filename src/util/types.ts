/**
 * A file for some global types
 */
/**
 * Allergy type
 */
export type Allergy = {
  id?: number;
  allergy: string;
};

/**
 * The Dinner type defining what
 *  parmaters are needed for this model
 */
export type Dinner = {
  id?: number;
  dish: string;
  cuisine: string;
  date: string;
  location: string;
  owner?: number; // The id of the owner user
  description?: string;
  allergies?: number[]; // A list of allergy ids
  signed_up_users?: number[]; // A list of the ids of users signed up for this dinner
  is_canceled?: boolean;
};

/**
 * A EditDinner type representing the parameters of dinner that are possible to edit
 */
export type EditDinner = {
  dish?: string;
  cuisine?: string;
  date?: string;
  location?: string;
  description?: string;
  allergies?: number[]; // A list of allergy ids
  is_canceled?: boolean;
};

export type User = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  allergies?: number[];
  about_me?: string;
};

export type RegistrationUser = {
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  allergies?: number[];
  about_me?: string;
  password: string;
  password2: string;
};

export type LoginUser = {
  username: string;
  password: string;
};
