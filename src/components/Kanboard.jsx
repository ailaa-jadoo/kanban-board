import React from 'react';
import Ticket from './ticket';
import { BsPlusLg } from 'react-icons/bs';
import { FaThumbsUp, FaExclamationTriangle, FaBell, FaRegClock, FaMinusCircle } from 'react-icons/fa'; // Import priority icons
import { SiTodoist } from 'react-icons/si';
import { TbProgress } from 'react-icons/tb';
import { RxCrossCircled } from 'react-icons/rx';


function Kanbanboard({ tickets, users, groupBy }) {
  // Function to group tickets based on the selected option
  const groupTickets = () => {
    switch (groupBy) {
      case 'status':
        return groupByStatus(tickets);
      case 'user':
        return groupByUser(tickets, users);
      case 'priority':
        return groupByPriority(tickets);
      case 'title':
        return groupByTitle(tickets);
      default:
        return {};
    }
  };

  // Function to sort tickets based on priority
  const sortTicketsByPriority = (groupedTickets) => {
    const sortedTickets = {};

    for (const key in groupedTickets) {
      sortedTickets[key] = groupedTickets[key].sort(
        (a, b) => b.priority - a.priority
      );
    }

    return sortedTickets;
  };

  // Function to sort tickets based on title
  const sortTicketsByTitle = (groupedTickets) => {
    const sortedTickets = {};

    for (const key in groupedTickets) {
      sortedTickets[key] = groupedTickets[key].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return sortedTickets;
  };

  // Group tickets based on the selected option
  const groupedTickets = groupTickets();

  // Sort tickets based on sorting options (priority or title)
  const sortedTickets =
    groupBy === 'priority'
      ? sortTicketsByPriority(groupedTickets)
      : sortTicketsByTitle(groupedTickets);

  return (
    <div className="kanban-board">
      {Object.keys(sortedTickets).map((group) => (
        <div key={group}>
          <h2>
            {groupBy === 'priority' && (
              <span className="priority-icon">
                {getPriorityIcon(group)}
              </span>
            )}
            {groupBy === 'status' && (
              <span className="priority-icon">
                {getStatusIcon(group)}
              </span>
            )}
            {group}
            <BsPlusLg className="plus-icon" />
          </h2>
          {sortedTickets[group].map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} users={users} />
          ))}
        </div>
      ))}
    </div>
  );
}

// Helper function to group tickets by status
function groupByStatus(tickets) {
  const grouped = {};

  tickets.forEach((ticket) => {
    const { status } = ticket;
    if (!grouped[status]) {
      grouped[status] = [];
    }
    grouped[status].push(ticket);
  });

  return grouped;
}

// Helper function to group tickets by user
function groupByUser(tickets, users) {
  const grouped = {};

  tickets.forEach((ticket) => {
    const user = users.find((u) => u.id === ticket.userId);
    if (user) {
      const { name } = user;
      if (!grouped[name]) {
        grouped[name] = [];
      }
      grouped[name].push(ticket);
    }
  });

  return grouped;
}

// Helper function to group tickets by priority
function groupByPriority(tickets) {
  const grouped = {
    'No priority': [],
    'Urgent': [],
    'High': [],
    'Medium': [],
    'Low': [],
  };

  tickets.forEach((ticket) => {
    const { priority } = ticket;
    const priorityGroup = {
      0: 'No priority',
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
    }[priority];
    grouped[priorityGroup].push(ticket);
  });

  return grouped;
}

// Helper function to group tickets by title
function groupByTitle(tickets) {
  let sortedTickets = [];

  // Sort the tickets by title
  sortedTickets = [...tickets].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Group the sorted tickets by their title's first letter
  const grouped = {};
  sortedTickets.forEach((ticket) => {
    const firstLetter = ticket.title.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(ticket);
  });

  return grouped;
}

// Helper function to get the priority icon based on priority group
function getPriorityIcon(group) {
  switch (group) {
    case 'No priority':
      return <FaThumbsUp />;
    case 'Urgent':
      return <FaExclamationTriangle />;
    case 'High':
      return <FaBell />;
    case 'Medium':
      return <FaRegClock />;
    case 'Low':
      return <FaMinusCircle />;
    default:
      return null;
  }
}

// Helper function to get the status icon based on status group
function getStatusIcon(group) {
  switch (group) {
    case 'Todo':
      return <SiTodoist />;
    case 'In progress':
      return <TbProgress />;
    case 'Backlog':
      return <RxCrossCircled />;
    default:
      return null;
  }
}

export default Kanbanboard;
