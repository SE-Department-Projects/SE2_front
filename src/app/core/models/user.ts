export interface User {
  _id: string;
  username: string;
  email: string;
  CreatedAt: string;
}

export interface AddUser {
  username: string;
  email: string;
  role: string;
}
