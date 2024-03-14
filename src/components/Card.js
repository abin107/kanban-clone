import React, { useContext } from 'react';
import '../styles/card.css';
import {UserContext} from '../context';

const Card = ({ ticket }) => {
  const users = useContext(UserContext);
  if (!ticket) {
    return null;
  }
  const user = users.find((user) => user.id === ticket.userId);
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>User: {user.name}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
    </div>
  );
};

export default Card;