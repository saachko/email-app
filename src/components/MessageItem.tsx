import React from 'react';
import { Accordion } from 'react-bootstrap';

interface MessageItemProps {
  eventKey: string;
  date: string;
  from: string;
  to: string;
  subject: string;
  text: string;
}

function MessageItem({
  eventKey,
  date,
  from,
  to,
  subject,
  text,
}: MessageItemProps) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <div className="d-flex flex-column">
          <p className="small text-secondary mb-3">
            <em>{date}</em>
          </p>
          <p className="mb-1">
            <span>
              <strong>From: </strong>
            </span>
            <span>{from}</span>
          </p>
          <p className="mb-1">
            <span>
              <strong>To: </strong>
            </span>
            <span>{to}</span>
          </p>
          <p>
            <span>
              <strong>Subject: </strong>
            </span>
            <span>{subject}</span>
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body className="message mt-0">{text}</Accordion.Body>
    </Accordion.Item>
  );
}

export default MessageItem;
