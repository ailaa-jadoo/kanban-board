import React, { useEffect, useState } from 'react';
import './App.css';
import Kanbanboard from './components/kanboard';
import Options from './components/Options';
import { useLocalStorage } from 'react-use';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  // Initialize the groupBy state with a default value, or retrieve the saved state from local storage.
  const [localStorageGroupBy, setLocalStorageGroupBy] = useLocalStorage('groupBy', 'status');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorageGroupBy);

  useEffect(() => {
    // Fetch data from the API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  return (
    <div className="App">
      <h1 className='main-head'>Kanban Board</h1>
      <Options groupBy={groupBy} setGroupBy={setGroupBy} />
      <Kanbanboard tickets={tickets} users={users} groupBy={groupBy} />
    </div>
  );
}

export default App;
