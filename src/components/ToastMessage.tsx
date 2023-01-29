import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

import SetState from '../utils/types';

interface ToastMessageProps {
  isShown: boolean;
  setShown: SetState<boolean>;
  senderName: string | undefined;
  subject: string | undefined;
  messageBody: string | undefined;
}

function ToastMessage({
  isShown,
  setShown,
  senderName,
  subject,
  messageBody,
}: ToastMessageProps) {
  return (
    <ToastContainer className="p-3 toast-animation" position="bottom-start">
      <Toast
        animation
        onClose={() => setShown(false)}
        show={isShown}
        delay={4000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{senderName}</strong>
          <small>
            <em>now</em>
          </small>
        </Toast.Header>
        <Toast.Body>
          <strong className="me-auto">{subject}</strong>
          <p>
            {messageBody?.length && messageBody?.length > 80
              ? `${messageBody?.slice(0, 80)}...`
              : messageBody}
          </p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessage;
