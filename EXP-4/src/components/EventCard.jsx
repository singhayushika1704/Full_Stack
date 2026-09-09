import React, { useRef, useEffect } from 'react';

const EventCard = ({ event, onDragStart, onRemove, renderTracker }) => {
  const cardRef = useRef(null);

  // Safely update the tracker without triggering React state updates
  if (renderTracker) {
    renderTracker.current[event.id] = (renderTracker.current[event.id] || 0) + 1;
    renderTracker.current.total = (renderTracker.current.total || 0) + 1;
  }

  useEffect(() => {
    // Trigger visual pulse on render
    if (cardRef.current) {
      cardRef.current.classList.remove('flash-render');
      void cardRef.current.offsetWidth; // Force CSS reflow
      cardRef.current.classList.add('flash-render');
    }
  });

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      className={`event-card type-${event.type}`}
    >
      <div className="event-header">
        <span className="event-time">{event.time}</span>
        <button onClick={() => onRemove(event.id)} className="delete-btn" title="Remove event">
          ×
        </button>
      </div>
      <div className="event-title">{event.title}</div>
    </div>
  );
};

// Custom comparison function for React.memo
export const MemoizedEventCard = React.memo(EventCard, (prevProps, nextProps) => {
  return (
    prevProps.event.id === nextProps.event.id &&
    prevProps.event.title === nextProps.event.title &&
    prevProps.event.time === nextProps.event.time &&
    prevProps.event.day === nextProps.event.day &&
    prevProps.event.type === nextProps.event.type &&
    prevProps.onDragStart === nextProps.onDragStart &&
    prevProps.onRemove === nextProps.onRemove
  );
});

export const StandardEventCard = EventCard;