export interface Request {
  id: number;
  user_id: number;
  name: string;
  city: string;
  text: string;
  phone: string | null;
  accept_guides: number[];
}
