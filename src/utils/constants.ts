const baseUrl = 'https://email-backend-hut3.onrender.com/';
const messages = `${baseUrl}messages`;
const send = `${messages}/send`;
const receive = `${baseUrl}messages/receive`;
const users = `${baseUrl}users`;
const login = `${users}/login`;

const socketUrl = 'wss://email-backend-hut3.onrender.com/';

const responseStatuses = {
  success: 200,
  status400: 400,
};

const emptyContainerText = {
  received: 'Your inbox is empty :(',
  sent: "You didn't any send messages",
};

export {
  messages,
  send,
  receive,
  users,
  login,
  socketUrl,
  responseStatuses,
  emptyContainerText,
};
