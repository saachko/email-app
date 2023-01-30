interface User {
  _id: string;
  username: string;
}

interface Message {
  _id: string;
  subject: string;
  body: string;
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  createdAt: string;
  updatedAt: string;
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
  senderName: string;
  receiver: string;
  receiverName: string;
}
interface MessageFetchResponse {
  newMessage: Message;
  status: number;
  message: string;
}

interface MessageResponse {
  newMessage: Message | null;
  status: number;
  message: string;
}

interface MessageOnSubscribe {
  subject: string;
  body: string;
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  _id: string;
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
  MessageResponse,
  MessageOnSubscribe,
};
