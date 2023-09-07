import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

function Options({ groupBy, setGroupBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localStorageGroupBy, setLocalStorageGroupBy] = useLocalStorage('groupBy', 'status');

  const handleOptionClick = (value) => {
    setGroupBy(value);
    setLocalStorageGroupBy(value);
    
    // Refresh the page when a new grouping option is selected
    window.location.reload();
  };

  const groupByOptions = {
    'status': 'Status',
    'user': 'User',
    'priority': 'Priority',
    'title': 'Title',
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-toggle"
      >
        Group By: {groupByOptions[localStorageGroupBy || groupBy]}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {Object.keys(groupByOptions).map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {groupByOptions[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Options;
