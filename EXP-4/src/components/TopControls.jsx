import React, { useState } from 'react';
import { DAYS } from '../utils/initialData';

const Toggle = ({ label, description, enabled, onChange }) => (
  <div className="toggle-wrapper">
    <button onClick={() => onChange(!enabled)} className={`toggle-btn ${enabled ? 'active' : ''}`}>
      <span className={`toggle-circle ${enabled ? 'active' : ''}`} />
    </button>
    <div className="toggle-text">
      <div className="toggle-label">{label}</div>
      <div className="toggle-desc">{description}</div>
    </div>
  </div>
);

const TopControls = ({ opts, setOpts, clockTick, onReset, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({ title: '', time: '12:00', day: 'Mon', type: 'meeting' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    onAddEvent({ ...newEvent, id: Date.now().toString() });
    setNewEvent({ ...newEvent, title: '' }); // reset title
  };

  return (
    <div className="panel controls-panel">
      <div className="toggles-grid">
        <Toggle 
          label="React.memo on cards" 
          description="Stops cards from re-rendering if their data hasn't changed. (Watch the flashing stops!)"
          enabled={opts.memo} onChange={(val) => setOpts({...opts, memo: val})} 
        />
        <Toggle 
          label="useCallback for handlers" 
          description="Stops 'Drag' & 'Delete' functions from being recreated, which breaks React.memo."
          enabled={opts.callback} onChange={(val) => setOpts({...opts, callback: val})} 
        />
        <Toggle 
          label="useMemo for filter (Lag Test)" 
          description="Caches an artificially 'slow' function. Turn off to feel the UI lag when typing/dragging."
          enabled={opts.useMemo} onChange={(val) => setOpts({...opts, useMemo: val})} 
        />
      </div>
      
      <div className="controls-footer">
        <form onSubmit={handleAdd} className="add-event-form">
          <input 
            type="text" placeholder="New event title..." value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} className="form-input"
          />
          <select value={newEvent.day} onChange={(e) => setNewEvent({...newEvent, day: e.target.value})} className="form-select">
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})} className="form-select">
            <option value="meeting">Meeting</option>
            <option value="deadline">Deadline</option>
            <option value="focus">Focus</option>
            <option value="personal">Personal</option>
          </select>
          <button type="submit" className="btn-primary">Add Event</button>
        </form>

        <div className="footer-actions">
          <Toggle label="Live clock (forces global render)" enabled={opts.clock} onChange={(val) => setOpts({...opts, clock: val})} />
          {opts.clock && <span className="clock-tick">Tick: {clockTick}</span>}
          <button onClick={onReset} className="reset-btn">Reset monitor</button>
        </div>
      </div>
    </div>
  );
};

export default TopControls;