import React, { useState } from 'react';

function Options({ groupBy, setGroupBy }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value) => {
    setGroupBy(value);
    setIsOpen(false);
  };

  // Define an object to map groupBy values to their corresponding display text
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
        Group By: {groupByOptions[groupBy]}
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
