import { User } from '../interfaces/user';

export class UserData {
  constructor(
    public users: User[],
    public number: number,
    public totalElements: number,
    public totalPages: number,
    public size: number
  ) {}
}
