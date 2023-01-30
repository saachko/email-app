import { MessageData } from './interfaces';

const baseUrl = 'https://email-backend2.onrender.com/';
const messages = `${baseUrl}messages`;
const send = `${messages}/send`;
const receive = `${baseUrl}messages/receive`;
const users = `${baseUrl}users`;
const login = `${users}/login`;

const responseStatuses = {
  success: 200,
  status400: 400,
};

const emptyContainerText = {
  received: 'Your inbox is empty :(',
  sent: "You didn't any send messages",
};

const defaultMessage: MessageData = {
  subject: 'default',
  body: 'default',
  sender: '63d6c1d8bb66eeff34d751c4',
  senderName: 'test3',
  receiver: '63d6c1d8bb66eeff34d751c4',
  receiverName: 'test3',
};

export {
  messages,
  send,
  receive,
  users,
  login,
  responseStatuses,
  emptyContainerText,
  defaultMessage,
};
