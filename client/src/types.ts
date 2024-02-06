export interface LoginUser {
  email: string;
  password: string;
}

export interface CreateUser extends LoginUser {
  firstName: string;
  lastName: string;
}

export interface User {
  credentials: object | null; // Should include name, membership status, other important details upon acct creation or login
}

export type CurrentUser = {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: {
    userCredentials: User;
    token: string;
  }) => Promise<void>;
  logout: () => void;
};