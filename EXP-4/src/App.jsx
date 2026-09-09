import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import TopControls from './components/TopControls';
import RenderMonitor from './components/RenderMonitor';
import { MemoizedEventCard, StandardEventCard } from './components/EventCard';
import { initialEvents, DAYS } from './utils/initialData';

function App() {
  const [events, setEvents] = useState(initialEvents);
  const [clockTick, setClockTick] = useState(0);

  const [opts, setOpts] = useState({
    memo: false,
    callback: false,
    useMemo: true,
    clock: false,
  });

  // Track renders mutably to prevent infinite loops
  const renderTracker = useRef({ total: 0 });
  const [, setMonitorRefresh] = useState(0);

  // 1. AUTO-RESET LOGIC: When top 3 buttons are ON, reset to 0.
  useEffect(() => {
    if (opts.memo && opts.callback && opts.useMemo) {
      renderTracker.current = { total: 0 };
      setMonitorRefresh((r) => r + 1); // Force monitor to visually update
    }
  }, [opts.memo, opts.callback, opts.useMemo]);

  // 2. LIVE CLOCK
  useEffect(() => {
    let interval;
    if (opts.clock) {
      interval = setInterval(() => {
        setClockTick((c) => c + 1);
        setMonitorRefresh((r) => r + 1); // Force monitor update on tick
      }, 500);
    }
    return () => clearInterval(interval);
  }, [opts.clock]);

  // --- HANDLERS ---
  const standardDragStart = (e, id) => e.dataTransfer.setData('eventId', id);
  const standardRemove = (id) => setEvents((prev) => prev.filter((ev) => ev.id !== id));

  const memoizedDragStart = useCallback((e, id) => {
    e.dataTransfer.setData('eventId', id);
  }, []);

  const memoizedRemove = useCallback((id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }, []);

  const onDragStart = opts.callback ? memoizedDragStart : standardDragStart;
  const onRemove = opts.callback ? memoizedRemove : standardRemove;

  // Drag & Drop Updates
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e, day) => {
    const id = e.dataTransfer.getData('eventId');
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, day } : ev)));
    setMonitorRefresh((r) => r + 1); // Update monitor after drop
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setMonitorRefresh((r) => r + 1);
  };

  // Artificial CPU Lag
  const filterEvents = (allEvents) => {
    const start = performance.now();
    while (performance.now() - start < 15) {} // 15ms block
    return allEvents;
  };

  const standardEvents = filterEvents(events);
  const memoizedEvents = useMemo(() => filterEvents(events), [events]);
  const processedEvents = opts.useMemo ? memoizedEvents : standardEvents;

  // Manual Reset Button
  const resetCounters = () => {
    renderTracker.current = { total: 0 };
    setMonitorRefresh((r) => r + 1);
  };

  const CardComponent = opts.memo ? MemoizedEventCard : StandardEventCard;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Interactive Calendar</h1>
        <p>
          Observe re-rendering behavior in real time. Switch on <strong>Live clock</strong> to simulate continuous state changes, then toggle optimization hooks to monitor performance differences.
        </p>
      </header>

      <TopControls
        opts={opts}
        setOpts={setOpts}
        clockTick={clockTick}
        onReset={resetCounters}
        onAddEvent={handleAddEvent}
      />

      <div className="main-layout">
        <div className="panel calendar-panel">
          <div className="calendar-header">
            <h3 className="panel-title">WEEK VIEW</h3>
            <div className="legend">
              <span className="legend-tag tag-meeting">Meeting</span>
              <span className="legend-tag tag-deadline">Deadline</span>
              <span className="legend-tag tag-focus">Focus block</span>
              <span className="legend-tag tag-personal">Personal</span>
            </div>
          </div>

          <div className="calendar-grid">
            {DAYS.map((day) => (
              <div key={day} onDragOver={onDragOver} onDrop={(e) => onDrop(e, day)} className="day-column">
                <h4 className="day-name">{day}</h4>
                {processedEvents
                  .filter((ev) => ev.day === day)
                  .map((ev) => (
                    <CardComponent
                      key={ev.id}
                      event={ev}
                      onDragStart={onDragStart}
                      onRemove={onRemove}
                      renderTracker={renderTracker}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        <RenderMonitor events={events} renderTracker={renderTracker} />
      </div>
    </div>
  );
}

export default App;