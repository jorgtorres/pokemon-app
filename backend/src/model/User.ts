export default interface User {
  id: number;
  username: string;
  hashed_password: Buffer;
  salt: Buffer;
}
