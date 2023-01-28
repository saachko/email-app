interface User {
  _id: string;
  username: string;
}

interface Message {
  _id: string;
  subject: string;
  body: string;
  sender: string;
  receiver: string;
  createdAt: Date;
  updatedAt: Date;
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
  value: string | undefined;
  label: string | undefined;
}

interface MessageData {
  subject: string;
  body: string;
  sender: string;
  receiver: string;
}
interface MessageFetchResponse {
  newMessage: Message;
  status: number;
  message: string;
}

export type {
  User,
  Message,
  LoginUserData,
  LoginFetchResponse,
  LoginResponse,
  UserSelect,
  MessageData,
  MessageFetchResponse,
};
