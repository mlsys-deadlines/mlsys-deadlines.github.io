import React, { useState, useEffect } from 'react';
import { intervalToDuration, isPast, formatDuration } from 'date-fns';

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            if (isPast(targetDate)) {
                return null;
            }
            return intervalToDuration({
                start: new Date(),
                end: targetDate
            });
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            if (!remaining) {
                clearInterval(timer);
            }
            setTimeLeft(remaining);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) {
        return <span className="deadline-passed">Deadline Passed</span>;
    }

    const { months, days, hours, minutes, seconds } = timeLeft;

    // Helper to pad numbers
    const pad = (n) => n?.toString().padStart(2, '0') || '00';

    return (
        <div className="countdown">
            {months > 0 && <div className="countdown-item"><span className="value">{months}</span><span className="label">Mo</span></div>}
            <div className="countdown-item"><span className="value">{days || 0}</span><span className="label">d</span></div>
            <div className="countdown-item"><span className="value">{pad(hours)}</span><span className="label">h</span></div>
            <div className="countdown-item"><span className="value">{pad(minutes)}</span><span className="label">m</span></div>
            <div className="countdown-item"><span className="value">{pad(seconds)}</span><span className="label">s</span></div>
        </div>
    );
};

export default Countdown;
