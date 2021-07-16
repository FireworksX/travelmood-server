import { UserExtend } from '@interfaces/users.interface';

export interface Request {
  id: number;
  user_id: number;
  name: string;
  city: string;
  text: string;
  date: string;
  phone: string | null;
  accept_guides: number[];
}

export interface RequestExtend {
  id: number;
  user_id: number;
  name: string;
  city: string;
  text: string;
  phone: string | null;
  accept_guides: UserExtend[];
}
