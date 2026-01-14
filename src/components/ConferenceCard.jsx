import React from 'react';
import { format } from 'date-fns';
import Countdown from './Countdown';

const ConferenceCard = ({ conference }) => {
    const { name, link, description, deadlineDate, place, tags, timezone, id } = conference;

    const googleCalendarUrl = () => {
        const start = deadlineDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = start; // Deadline is a point in time
        const text = encodeURIComponent(`${name} Deadline`);
        const details = encodeURIComponent(`Deadline for ${name}. \n\n${description}\n\n${link}`);
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${encodeURIComponent(place)}&sf=true&output=xml`;
    };

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

            <div className="card-footer">
                <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-calendar">
                    Add to Calendar
                </a>
            </div>
        </div>
    );
};

export default ConferenceCard;
