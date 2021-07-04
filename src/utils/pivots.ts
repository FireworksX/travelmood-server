import { UserRole } from '@interfaces/users.interface';
import { ContactType } from '@interfaces/contacts.interface';

export const rolesForContactsPivot: Record<UserRole, ContactType> = {
  guide: 'tg_bot_guide',
  client: 'tg_bot_client',
  admin: 'tg_bot_admin',
};
