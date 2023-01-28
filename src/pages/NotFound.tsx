import React from 'react';
import { Button, Card, Nav } from 'react-bootstrap';

function NotFound() {
  return (
    <div className="vh-75 d-flex flex-column justify-content-center align-items-center">
      <Card className="text-center w-50">
        <Card.Header>Oops!</Card.Header>
        <Card.Body>
          <Card.Title>Something went wrong</Card.Title>
          <Card.Text>{`This page doesn't exist`}</Card.Text>
          <Nav.Link href="/">
            <Button variant="primary">Go to the main page</Button>
          </Nav.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NotFound;
