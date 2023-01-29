import {
  login,
  messages,
  receive,
  responseStatuses,
  send,
  users,
} from './constants';
import {
  LoginFetchResponse,
  LoginUserData,
  Message,
  MessageData,
  MessageFetchResponse,
  User,
} from './interfaces';

const logInUser = async (userData: LoginUserData) => {
  try {
    const response = await fetch(`${login}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (response.status === responseStatuses.status400) {
      return {
        currentUser: null,
        status: response.status,
        message: (await response.json()).message,
      };
    }
    const loginResponse: LoginFetchResponse = await response.json();
    if (!localStorage.getItem('currentUserId')) {
      localStorage.setItem(
        'currentUserId',
        JSON.stringify(loginResponse.user._id)
      );
    }
    return {
      currentUser: loginResponse.user,
      status: response.status,
      message: loginResponse.message,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUsers = async () => {
  try {
    const response = await fetch(`${users}`, {
      method: 'GET',
    });
    const usersList: User[] = await response.json();
    return usersList;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`${users}/${userId}`, {
      method: 'GET',
    });
    const foundUser: User = await response.json();
    return foundUser;
  } catch (error) {
    localStorage.removeItem('currentUserId');
    document.location.reload();
    throw new Error(`${error}`);
  }
};

const sendMessage = async (messageData: MessageData) => {
  try {
    const response = await fetch(`${send}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
    if (response.status === responseStatuses.status400) {
      return {
        newMessage: null,
        status: response.status,
        message: (await response.json()).message,
      };
    }
    const messageResponse: MessageFetchResponse = await response.json();
    return {
      newMessage: messageResponse.newMessage,
      status: response.status,
      message: messageResponse.message,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getAllMessages = async () => {
  try {
    const response = await fetch(`${messages}`, {
      method: 'GET',
    });
    const fullMessagesList: Message[] = await response.json();
    return fullMessagesList;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const receiveMessages = async (receiverId: string) => {
  try {
    const response = await fetch(`${receive}/${receiverId}`, {
      method: 'GET',
    });
    const receivedMessages: Message[] = await response.json();
    return receivedMessages;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getMessagesSentByUser = async (senderId: string) => {
  try {
    const response = await fetch(`${send}/${senderId}`, {
      method: 'GET',
    });
    const receivedMessages: Message[] = await response.json();
    return receivedMessages;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  logInUser,
  getUsers,
  getUserById,
  sendMessage,
  getAllMessages,
  receiveMessages,
  getMessagesSentByUser,
};
