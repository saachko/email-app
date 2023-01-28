import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { User } from 'utils/interfaces';

import RecipientInput from './RecipientInput';

interface MessageFormProps {
  users: User[];
}

function MessageForm({ users }: MessageFormProps) {
  return (
    <Form>
      <Form.Group className="mb-3 d-flex" controlId="formUsers">
        <Form.Label column sm="3" className="me-2">
          Recipient
        </Form.Label>
        <RecipientInput users={users} />
      </Form.Group>
      <Form.Group className="mb-4 d-flex" controlId="formSubject">
        <Form.Label column sm="3" className="me-2">
          Subject
        </Form.Label>
        <Form.Control type="text" placeholder="(No subject)" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMessage">
        <Form.Control as="textarea" rows={3} placeholder="Your message..." />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Send message
      </Button>
    </Form>
  );
}

export default MessageForm;
