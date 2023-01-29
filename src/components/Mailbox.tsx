import React from 'react';
import { Accordion, Tab, Tabs } from 'react-bootstrap';
import { v4 } from 'uuid';

import { emptyContainerText } from '../utils/constants';
import { Message } from '../utils/interfaces';
import EmptyContainer from './EmptyContainer';
import MessageItem from './MessageItem';

interface MailboxProps {
  receivedMessages: Message[];
  sentMessages: Message[];
}

function Mailbox({ receivedMessages, sentMessages }: MailboxProps) {
  const parseDate = (dateFromDatabase: string) => {
    const parsedDate = new Date(dateFromDatabase);
    return parsedDate.toLocaleString();
  };

  return (
    <Tabs defaultActiveKey="received" className="mb-3" justify>
      <Tab eventKey="received" title="Inbox">
        {receivedMessages.length ? (
          <Accordion>
            {receivedMessages.map((message, index) => (
              <MessageItem
                key={v4()}
                eventKey={`${index}`}
                date={parseDate(message.createdAt)}
                from={message.senderName}
                to={message.receiverName}
                subject={message.subject}
                text={message.body}
              />
            ))}
          </Accordion>
        ) : (
          <EmptyContainer text={emptyContainerText.received} />
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent">
        {sentMessages.length ? (
          <Accordion>
            {sentMessages.map((message, index) => (
              <MessageItem
                key={v4()}
                eventKey={`${index}`}
                date={parseDate(message.createdAt)}
                from={message.senderName}
                to={message.receiverName}
                subject={message.subject}
                text={message.body}
              />
            ))}
          </Accordion>
        ) : (
          <EmptyContainer text={emptyContainerText.sent} />
        )}
      </Tab>
    </Tabs>
  );
}

export default Mailbox;
