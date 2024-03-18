import React, { useEffect, useState } from 'react';
import './styles/app.css';
import { Board, Header } from './components';
import { fetchData } from './data/initialData';
import { UserContext } from './context';
import { GROUP_BY_OPTIONS, KEYS, SORT_BY_OPTIONS } from './common';
import { useLocalStorage } from './hooks';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useLocalStorage(KEYS.GROUP, GROUP_BY_OPTIONS.status);
  const [sortBy, setSortBy] = useLocalStorage(KEYS.SORT, GROUP_BY_OPTIONS.status);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [tickets, sortBy, groupBy]);

  const getColumns = () => {
    let sortedTickets = [...tickets];
    if (sortBy === SORT_BY_OPTIONS.priority) {
      sortedTickets.sort((a, b) => a.priority - b.priority);
    } else if (sortBy === SORT_BY_OPTIONS.title) {
      sortedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }
  
    const columns = [];
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
  
    return columns;
  };

  const handleSortByChange = (event) => { // not using callback here
    setSortBy(event.target.value);
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <UserContext.Provider value={users}>
      <div className="App">
        <Header 
          sortBy={sortBy} 
          groupBy={groupBy} 
          handleSortByChange={handleSortByChange} 
          handleGroupByChange={handleGroupByChange} 
        />
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