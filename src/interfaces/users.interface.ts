import { ContactCell } from '@interfaces/contacts.interface';

export type UserRole = 'guide' | 'client' | 'admin';

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  password: string;
  role: UserRole[];
  contacts: number[];
}

export interface UserExtend {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  password: string;
  role: UserRole[];
  contacts: ContactCell[];
}
