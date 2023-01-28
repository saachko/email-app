import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { responseStatuses } from 'utils/constants';

import { logInUser } from '../utils/api';
import { LoginResponse, LoginUserData } from '../utils/interfaces';
import SetState from '../utils/types';

type LoginInputs = {
  username: HTMLInputElement;
};

interface LoginFormProps {
  isLoggedIn: boolean;
  setLoggedIn: SetState<boolean>;
}

function LoginForm({ isLoggedIn, setLoggedIn }: LoginFormProps) {
  const [response, setResponse] = useState<LoginResponse | null>(null);

  // useEffect(() => {
  //   if (response) {
  //     setNotificationMessage(response?.message);
  //     setNotificationShown(true);
  //     if (
  //       response?.status === responseStatuses.status400 ||
  //       response.status === responseStatuses.status403
  //     ) {
  //       setNotificationVariant('danger');
  //       localStorage.removeItem('accessUserToken');
  //     } else {
  //       setNotificationVariant('primary');
  //     }
  //   }
  // }, [response]);

  const handleResponse = async (loginResponse: LoginResponse) => {
    setResponse(loginResponse);
    console.log(loginResponse);
    if (loginResponse?.status === responseStatuses.success) {
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
