export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userRole: string;
  id?: number;
  enabled?: boolean;
  locked?: boolean;
  createdOn?: string;
  lockedOn?: string;
  updatedOn?: string;
  disabledOn?: string;
}
