export type UserRole = 'guide' | 'client' | 'admin';

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string;
  password: string;
  role: UserRole[];
  tg_chat_id: number | null;
}
