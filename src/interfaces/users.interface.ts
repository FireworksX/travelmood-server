import { ContactCell } from '@interfaces/contacts.interface';
import { City } from '@interfaces/cities.interface';

export type UserRole = 'guide' | 'client' | 'admin';

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  password: string;
  role: UserRole[];
  contacts: number[];
  cities: number[];
}

export interface UserExtend {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  password: string;
  role: UserRole[];
  contacts: ContactCell[];
  cities: City[];
}
