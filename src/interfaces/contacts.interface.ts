export type ContactType = 'tg_bot_guide' | 'tg_bot_client' | 'tg_bot_admin' | 'phone' | 'email';

export interface ContactCell {
  id: number;
  type: ContactType;
  value: string | number | null;
}
