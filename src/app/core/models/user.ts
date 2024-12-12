export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AddUser {
  username: string;
  email: string;
  role: string;
}
