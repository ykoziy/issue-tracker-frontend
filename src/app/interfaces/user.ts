export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userRole: string;
  enabled?: boolean;
  locked?: boolean;
}
