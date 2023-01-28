import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { responseStatuses } from 'utils/constants';

import { logInUser } from '../utils/api';
import { LoginResponse, LoginUserData, User } from '../utils/interfaces';
import SetState from '../utils/types';

type LoginInputs = {
  username: HTMLInputElement;
};

interface LoginFormProps {
  setLoggedIn: SetState<boolean>;
  setCurrentUser: SetState<User | null>;
  setNotificationShown: SetState<boolean>;
  setNotificationMessage: SetState<string>;
  setNotificationVariant: SetState<string>;
}

function LoginForm({
  setLoggedIn,
  setCurrentUser,
  setNotificationShown,
  setNotificationMessage,
  setNotificationVariant,
}: LoginFormProps) {
  const [response, setResponse] = useState<LoginResponse | null>(null);

  useEffect(() => {
    if (response) {
      setNotificationMessage(response?.message);
      setNotificationShown(true);
      if (response?.status === responseStatuses.status400) {
        setNotificationVariant('danger');
        localStorage.removeItem('currentUserId');
      } else {
        setNotificationVariant('primary');
      }
    }
  }, [response]);

  const handleResponse = async (loginResponse: LoginResponse) => {
    setResponse(loginResponse);
    if (loginResponse?.status === responseStatuses.success) {
      setCurrentUser(loginResponse.currentUser);
      setTimeout(() => setLoggedIn(true), 500);
    }
  };

  const confirmLogin = async (userData: LoginUserData) => {
    try {
      handleResponse(await logInUser(userData));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & LoginInputs
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { username } = form;
    await confirmLogin({
      username: username.value,
    });
  };

  return (
    <Form
      className="col-md-4 col-sm-5 mx-auto vh-50 d-flex flex-column justify-content-center"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="username"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Log in
      </Button>
    </Form>
  );
}

export default LoginForm;
