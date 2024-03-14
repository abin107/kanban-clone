import React, { useEffect, useContext, useState } from 'react';
import Card from './Card';
import '../styles/column.css';
import { GROUP_BY_OPTIONS, PRIORITY_LEVELS } from '../common/constants';
import {UserContext} from '../context';


const Column = ({ column, groupBy }) => {
  
  const [title, setTitle ] = useState(column.title);
  const users = useContext(UserContext);

  
  useEffect(() => {
    switch (groupBy) {
      case GROUP_BY_OPTIONS.userId:
        const user = users.find((user) => user.id === column.title);
        console.log (users,column.title);
        setTitle(user.name);
        break;
      case GROUP_BY_OPTIONS.priority:
        setTitle(PRIORITY_LEVELS[column.title]);
        console.log(column.title, PRIORITY_LEVELS[column.title]);
        break;
      case GROUP_BY_OPTIONS.status:
        console.log(column.title, groupBy);
        setTitle(column.title);
        break;
      default:
        setTitle(column.title);
      }
    }, [groupBy]);

  if (!column) {
    return null;
  }

  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="cards">
        {column.tickets.map((ticket, index) => (
          <Card key={`card-${index}`} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Column;