interface User {
  _id: string;
  username: string;
}

interface LoginUserData {
  username: string;
}

interface LoginFetchResponse {
  user: User;
  status: number;
  message: string;
}

interface LoginResponse {
  currentUser: User | null;
  status: number;
  message: string;
}

interface UserSelect {
  value: string;
  label: string;
}

export type {
  User,
  LoginUserData,
  LoginFetchResponse,
  LoginResponse,
  UserSelect,
};
