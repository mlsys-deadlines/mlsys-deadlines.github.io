import React, { useMemo, useState } from 'react';
import { getConferences } from './utils/data';
import ConferenceCard from './components/ConferenceCard';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    type: 'All',
    tag: 'All'
  });

  const allData = useMemo(() => getConferences(), []);

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set();
    allData.forEach(event => {
      if (event.tags) {
        event.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [allData]);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();

    let filtered = allData;

    if (filters.type !== 'All') {
      filtered = filtered.filter(event => event.type === filters.type);
    }

    if (filters.tag !== 'All') {
      filtered = filtered.filter(event => event.tags && event.tags.includes(filters.tag));
    }

    const upcoming = filtered
      .filter(c => c.deadlineDate > now)
      .sort((a, b) => a.deadlineDate - b.deadlineDate); // Ascending

    const past = filtered
      .filter(c => c.deadlineDate <= now)
      .sort((a, b) => b.deadlineDate - a.deadlineDate); // Descending

    return { upcoming, past };
  }, [allData, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="app-container">
      <header className="site-header">
        <h1>MLSys Deadlines</h1>
        <p>Countdown to top Machine Learning Systems conferences.</p>
      </header>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        availableTags={availableTags}
      />

      <section className="section-upcoming">
        <h2 className="section-title">Upcoming Deadlines</h2>
        <div className="conference-list">
          {upcoming.map(conf => (
            <ConferenceCard key={conf.id || conf.name} conference={conf} />
          ))}
          {upcoming.length === 0 && <p className="no-data">No upcoming deadlines found matching your filters.</p>}
        </div>
      </section>

      {past.length > 0 && (
        <>
          <div className="section-divider"></div>
          <section className="section-past">
            <h2 className="section-title">Past Deadlines</h2>
            <div className="conference-list">
              {past.map(conf => (
                <ConferenceCard key={conf.id || conf.name} conference={conf} />
              ))}
            </div>
          </section>
        </>
      )}

      <footer className="site-footer">
        <p>Built by <a href="https://mustaphaabdullahi.com" target="_blank" rel="noopener noreferrer">Mustapha Abdullahi</a> with <strong>Antigravity</strong>.</p>
        <p className="footer-sub">
          Community maintained. Send Pull Requests to <a href="https://github.com/mlsys-deadlines/mlsys-deadlines.github.io" target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
