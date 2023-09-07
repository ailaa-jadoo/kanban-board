import React, { useState } from 'react';
import { BsCircleFill, BsFillExclamationSquareFill } from 'react-icons/bs';
import { FaUserAlt, FaUserAltSlash, FaCheckCircle } from 'react-icons/fa';
import { useLocalStorage } from 'react-use'; // Import useLocalStorage

function Ticket({ ticket, users }) {
  const { title, status, priority, id, tag, userId } = ticket;
  const user = users.find((u) => u.id === userId);

  // Initialize the isSelected state with a default value, or retrieve the saved state from local storage.
  const [localStorageSelected, setLocalStorageSelected] = useLocalStorage(`ticket-selected-${id}`, false);
  const [isSelected, setIsSelected] = useState(localStorageSelected);

  const userIcon = user && user.available ? <FaUserAlt className="user-icon" /> : <FaUserAltSlash className="user-icon red" />;
  const selectionIcon = !isSelected ? null : <FaCheckCircle className="ticket-selected" />;

  const handleTicketClick = () => {
    setIsSelected(!isSelected);
    setLocalStorageSelected(!isSelected); // Save the selection state to local storage
  };

  return (
    <div className={`kanban-group ${isSelected ? 'selected' : ''}`} onClick={handleTicketClick}>
      <div className="ticket-user">
        <div className="ticket-id">{id}</div>
        {userIcon}
      </div>
      <div className={`ticket-title ${isSelected ? 'selected' : ''}`}>{selectionIcon} {title}</div>
      <div className="ticket-tag">
        <BsFillExclamationSquareFill className="prior-icon" />
        <p><BsCircleFill className="tag-icon" />{tag}</p>
      </div>
    </div>
  );
}

export default Ticket;
