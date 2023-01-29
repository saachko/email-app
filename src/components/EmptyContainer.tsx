import React from 'react';

interface EmptyContainerProps {
  text: string;
}

function EmptyContainer({ text }: EmptyContainerProps) {
  return <div className="h3 text-secondary text-center mt-5">{text}</div>;
}

export default EmptyContainer;
