import React from 'react';
import { Button, Form } from 'react-bootstrap';

function LoginForm() {
  return (
    <Form className="col-md-4 col-sm-5 mx-auto vh-50 d-flex flex-column justify-content-center">
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
