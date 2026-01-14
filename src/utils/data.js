import { parseISO, isFuture, compareAsc } from 'date-fns';

// Load all yaml files from the conferences AND workshops directory
const conferenceGlob = import.meta.glob('../conferences/*.yaml', { eager: true });
const workshopGlob = import.meta.glob('../workshops/*.yaml', { eager: true });

export function getConferences() {
    const allEvents = [];
    const allGlobs = { ...conferenceGlob, ...workshopGlob };

    for (const path in allGlobs) {
        const content = allGlobs[path].default || allGlobs[path];

        // Check for root keys: 'conferences' or 'workshops'
        if (content) {
            if (content.conferences && Array.isArray(content.conferences)) {
                allEvents.push(...content.conferences);
            } else if (content.workshops && Array.isArray(content.workshops)) {
                allEvents.push(...content.workshops);
            } else if (Array.isArray(content)) {
                // Fallback for any legacy array-based files
                allEvents.push(...content);
            }
        }
    }

    // Sort by deadline, upcoming first
    return allEvents
        .map(event => ({
            ...event,
            deadlineDate: parseISO(event.deadline)
        }))
        .sort((a, b) => compareAsc(a.deadlineDate, b.deadlineDate));
}
