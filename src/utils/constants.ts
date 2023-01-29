const baseUrl = 'http://localhost:3001/';
const send = `${baseUrl}messages/send`;
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

export { send, receive, users, login, responseStatuses, emptyContainerText };
