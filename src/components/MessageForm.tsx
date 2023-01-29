import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { sendMessage } from '../utils/api';
import { responseStatuses } from '../utils/constants';
import { MessageData, MessageResponse, User } from '../utils/interfaces';
import RecipientInput from './RecipientInput';

interface MessageFormProps {
  users: User[];
  currentUser: User | null;
}

type MessageInputs = {
  receiver: HTMLSelectElement;
  subject: HTMLInputElement;
  body: HTMLTextAreaElement;
};

function MessageForm({ users, currentUser }: MessageFormProps) {
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [response, setResponse] = useState<MessageResponse | null>(null);

  const handleResponse = async (messageResponse: MessageResponse) => {
    setResponse(messageResponse);
    if (messageResponse?.status === responseStatuses.success) {
      console.log(messageResponse.newMessage);
    }
  };

  const confirmMessage = async (messageData: MessageData) => {
    try {
      handleResponse(await sendMessage(messageData));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & MessageInputs
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { subject, body } = form;
    if (currentUser) {
      await confirmMessage({
        subject: subject.value ? subject.value : '(No subject)',
        body: body.value,
        sender: currentUser._id,
        senderName: currentUser.username,
        receiver: receiverId,
        receiverName,
      });
    }
    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 d-flex" controlId="formUsers">
        <Form.Label column sm="3" className="me-2">
          Recipient
        </Form.Label>
        <RecipientInput
          users={users}
          name="receiver"
          setReceiverId={setReceiverId}
          setReceiverName={setReceiverName}
        />
      </Form.Group>
      <Form.Group className="mb-4 d-flex" controlId="formSubject">
        <Form.Label column sm="3" className="me-2">
          Subject
        </Form.Label>
        <Form.Control type="text" placeholder="(No subject)" name="subject" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMessage">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Your message..."
          name="body"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100 mt-2">
        Send message
      </Button>
    </Form>
  );
}

export default MessageForm;
