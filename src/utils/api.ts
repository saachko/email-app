import { login, responseStatuses, users } from './constants';
import { LoginFetchResponse, LoginUserData, User } from './interfaces';

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
    localStorage.setItem(
      'currentUserId',
      JSON.stringify(loginResponse.user._id)
    );
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

export { logInUser, getUsers, getUserById };
