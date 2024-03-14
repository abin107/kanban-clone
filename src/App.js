import React, { useEffect, useCallback, useState } from 'react';
import './styles/app.css';
import { Board } from './components';
import { fetchData } from './data/initialData';
import {UserContext} from './context';
import { GROUP_BY_OPTIONS, SORT_BY_OPTIONS } from './common';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || GROUP_BY_OPTIONS.status);
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || SORT_BY_OPTIONS.title);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedTickets, setSortedTickets] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      const { tickets, users } = fetchedData;
      setTickets(tickets);
      setUsers(users);
      setColumns(getColumns());
      setIsLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    setColumns(getColumns());
  }, [sortedTickets, groupBy]);

  useEffect(() => {
    console.log('useEffect', groupBy);
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
    sortTickets();
  }, [tickets, sortBy]);

  const sortTickets = () => {
    let sortedTickets = [...tickets];
    if (sortBy === SORT_BY_OPTIONS.priority) {
      sortedTickets.sort((a, b) => a.priority - b.priority);
    } else if (sortBy === SORT_BY_OPTIONS.title) {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    setSortedTickets(sortedTickets);
  };

  const getColumns = useCallback(() => {
    const columns = [];
    console.log('getColumns', groupBy);
    const groupedTickets = sortedTickets.reduce((grouped, ticket) => {
      const groupByValue = ticket[groupBy];
      if (!grouped[groupByValue]) {
        grouped[groupByValue] = [];
      }
      grouped[groupByValue].push(ticket);
      return grouped;
    }, {});
    for (const key in groupedTickets) {
      columns.push({ title: key, tickets: groupedTickets[key] });
    }
    console.log('columns', columns);
    return columns;  }, [sortedTickets, groupBy]);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <UserContext.Provider value={users}>
      <div className="App">
        <header className="App-header">
          <h1>Kanban Board</h1>
          <div>
            <label htmlFor="sortBy">Sort By:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
              <option value={SORT_BY_OPTIONS.priority}>Priority</option>
              <option value={SORT_BY_OPTIONS.title}>Title</option>
            </select>
          </div>
          <div>
            <label htmlFor="groupBy">Group By:</label>
            <select id="groupBy" value={groupBy} onChange={handleGroupByChange}>
              <option value={GROUP_BY_OPTIONS.status}>Status</option>
              <option value={GROUP_BY_OPTIONS.userId}>User</option>
              <option value={GROUP_BY_OPTIONS.priority}>Priority</option>
            </select>
          </div>
        </header>
        {isLoading ? (
          <div className="progress-bar">Loading...</div>
        ) : (
          <Board columns={columns} groupBy={groupBy} />
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;