export class JwtPayload {
  constructor(
    public sub: number,
    public id: string,
    public role: string,
    public iat: number,
    public exp: number
  ) {}
}
