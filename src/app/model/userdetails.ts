export class UserDetails {
  constructor(
    public id: number,
    public userRole: string,
    public authToken?: string
  ) {}
}
