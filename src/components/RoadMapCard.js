import React, { useState } from 'react';
import '../styles/roadmap.css';

const RoadMapCard = ({ title, description, onMarkAsDone, isCompleted }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleMarkAsDone = () => {
    onMarkAsDone(title);
    handleDialogClose();
  };

  return (
    <div className={`roadmap-node-card ${isCompleted ? 'completed' : ''}`}>
      <div className="roadmap-card" onClick={!isCompleted? handleCardClick:()=>{}}>
        {title}
      </div>
      {isOpen && (
        <div className="roadmap-node-dialog" >
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={handleMarkAsDone} disabled={isCompleted}>
            {isCompleted ? 'Completed' : 'Mark as Done'}
          </button>
          <button onClick={handleDialogClose}>Close</button>
        </div>
      )}
    </div>
  );
};


export default RoadMapCard;
