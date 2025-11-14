export class LoginRequest {
  constructor(
    public username: string,
    public password: string,
    public grant_type: string
  ) {}
}
