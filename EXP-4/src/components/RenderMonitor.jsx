import React from 'react';

const RenderMonitor = ({ events, renderTracker }) => {
  const totalRenders = renderTracker.current?.total || 0;
  const renderedCount = events.filter((e) => (renderTracker.current[e.id] || 0) > 0).length;

  return (
    <div className="panel render-monitor">
      <h3 className="panel-title">RENDER MONITOR</h3>

      <div className="monitor-stats">
        <div className="stat-box">
          <div className="stat-number text-accent">{totalRenders}</div>
          <div className="stat-label">Total Renders</div>
        </div>
        <div className="stat-box right">
          <div className="stat-number text-accent">
            {renderedCount}/{events.length}
          </div>
          <div className="stat-label">Cards Rendered</div>
        </div>
      </div>

      <div className="progress-list">
        {events.map((event) => {
          const count = renderTracker.current[event.id] || 0;
          const maxScale = Math.max(20, totalRenders / 2 || 20);
          const width = Math.min((count / maxScale) * 100, 100);

          return (
            <div key={event.id} className="progress-row">
              <span className="progress-title" title={event.title}>
                {event.title}
              </span>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${width}%` }} />
              </div>
              <span className="progress-count">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenderMonitor;