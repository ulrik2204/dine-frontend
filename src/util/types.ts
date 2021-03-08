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
  owner: string;
  description?: string;
  allergies?: Allergy[];
};
