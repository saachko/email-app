import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as io from 'socket.io-client';

import {
  getAllMessages,
  getMessagesSentByUser,
  receiveMessages,
  sendMessage,
} from '../utils/api';
import { responseStatuses, socketUrl } from '../utils/constants';
import {
  Message,
  MessageData,
  MessageResponse,
  User,
  UserSelect,
} from '../utils/interfaces';
import SetState from '../utils/types';
import RecipientInput from './RecipientInput';
import ToastMessage from './ToastMessage';

interface MessageFormProps {
  users: User[];
  currentUser: User | null;
  setNotificationShown: SetState<boolean>;
  setNotificationMessage: SetState<string>;
  setNotificationVariant: SetState<string>;
  setReceivedMessages: SetState<Message[]>;
  setSentMessages: SetState<Message[]>;
}

type MessageInputs = {
  receiver: HTMLSelectElement;
  subject: HTMLInputElement;
  body: HTMLTextAreaElement;
};

const socket = io.connect(socketUrl);

function MessageForm({
  users,
  currentUser,
  setNotificationShown,
  setNotificationMessage,
  setNotificationVariant,
  setReceivedMessages,
  setSentMessages,
}: MessageFormProps) {
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [selectValue, setSelectValue] = useState<UserSelect | null>(null);
  const [response, setResponse] = useState<MessageResponse | null>(null);
  const [newMessage, setNewMessage] = useState<MessageData | null>(null);
  const [isToastMessageShown, setToastMessageShown] = useState(false);

  useEffect(() => {
    if (response) {
      setNotificationMessage(response?.message);
      setNotificationShown(true);
      if (response?.status === responseStatuses.status400) {
        setNotificationVariant('danger');
      }
    }
  }, [response]);

  const handleResponse = (messageResponse: MessageResponse) => {
    setResponse(messageResponse);
  };

  const confirmMessage = async (messageData: MessageData) => {
    try {
      handleResponse(await sendMessage(messageData));
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const showNewMessage = async () => {
    if (currentUser) {
      const newMessagesList = (
        await receiveMessages(currentUser._id)
      ).reverse();
      if ((await getAllMessages()).reverse()[0].receiver === currentUser?._id) {
        setReceivedMessages(newMessagesList);
        setNewMessage(newMessagesList[0]);
        setToastMessageShown(true);
      }
    }
  };

  const handleSubmit: React.FormEventHandler<
    HTMLFormElement & MessageInputs
  > = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { subject, body } = form;
    if (currentUser) {
      socket.emit('send_message', {
        subject: subject.value ? subject.value : '(No subject)',
        body: body.value,
        sender: currentUser._id,
        senderName: currentUser.username,
        receiver: receiverId,
        receiverName,
      });
      await confirmMessage({
        subject: subject.value ? subject.value : '(No subject)',
        body: body.value,
        sender: currentUser._id,
        senderName: currentUser.username,
        receiver: receiverId,
        receiverName,
      });
      setSentMessages((await getMessagesSentByUser(currentUser._id)).reverse());
      if (currentUser._id === receiverId) showNewMessage();
    }
    setSelectValue(null);
    form.reset();
  };

  useEffect(() => {
    socket.on('receive_message', async () => {
      showNewMessage();
    });
  }, [socket]);

  return (
    <>
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
            value={selectValue}
            setValue={setSelectValue}
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
      {isToastMessageShown && (
        <ToastMessage
          isShown={isToastMessageShown}
          setShown={setToastMessageShown}
          senderName={newMessage?.senderName}
          subject={newMessage?.subject}
          messageBody={newMessage?.body}
        />
      )}
    </>
  );
}

export default MessageForm;
