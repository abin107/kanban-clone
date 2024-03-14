import React from 'react';
import Column from './Column';
import '../styles/board.css';

const Board = ({ columns , groupBy}) => {
  return (
    <div className="board" >
      {columns.map((column, index) => (
        <Column key={`column-${index}`} column={column} groupBy={groupBy} />
      ))}
    </div>
  );
};

export default Board;