import React from 'react';
import { Button, Form } from 'react-bootstrap';

function MessageForm() {
  return (
    <Form>
      <Form.Group className="mb-3 d-flex" controlId="exampleForm.ControlInput1">
        <Form.Label column sm="3" className="me-2">
          Recipient
        </Form.Label>
        <Form.Control type="text" placeholder="name@example.com" autoFocus />
      </Form.Group>
      <Form.Group className="mb-4 d-flex" controlId="exampleForm.ControlInput1">
        <Form.Label column sm="3" className="me-2">
          Subject
        </Form.Label>
        <Form.Control type="text" placeholder="(No subject)" autoFocus />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} placeholder="Your message..." />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Send message
      </Button>
    </Form>
  );
}

export default MessageForm;
