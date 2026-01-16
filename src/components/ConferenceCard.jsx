import React, { useState } from 'react';
import { format } from 'date-fns';
import Countdown from './Countdown';
import { createCalendarLinks } from '../utils/calendar';

const ConferenceCard = ({ conference }) => {
    const { name, link, description, deadlineDate, place, tags, timezone, id } = conference;
    const [showCalendarOptions, setShowCalendarOptions] = useState(false);

    const links = createCalendarLinks(conference);

    return (
        <div className="conference-card">
            <div className="card-header">
                <div className="title-row">
                    <h2 className="conference-name">
                        <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>
                    </h2>
                    <span className="conference-place">{place}</span>
                </div>
                <div className="tags">
                    {tags && tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
            </div>

            <div className="card-body">
                <div className="deadline-info">
                    <span className="deadline-label">Deadline:</span>
                    <span className="deadline-date">{format(deadlineDate, 'MMMM d, yyyy')} ({timezone})</span>
                </div>

                <Countdown targetDate={deadlineDate} />
            </div>

            <div className="card-footer" onMouseLeave={() => setShowCalendarOptions(false)}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    Website
                </a>

                <div className="calendar-dropdown-container">
                    <button
                        className="btn-calendar"
                        onMouseEnter={() => setShowCalendarOptions(true)}
                        onClick={() => setShowCalendarOptions(!showCalendarOptions)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Add to Calendar
                    </button>

                    {showCalendarOptions && (
                        <div className="calendar-options">
                            <a href={links.google} target="_blank" rel="noopener noreferrer">Google</a>
                            <a href={links.outlook} target="_blank" rel="noopener noreferrer">Outlook</a>
                            <a href={links.yahoo} target="_blank" rel="noopener noreferrer">Yahoo</a>
                            <a href={links.ics} download={`${id || 'conference'}.ics`}>iCal (.ics)</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConferenceCard;
