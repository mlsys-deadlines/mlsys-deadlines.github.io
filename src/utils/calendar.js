export const createCalendarLinks = (event) => {
    const { name, description, deadlineDate, link, place } = event;
    const start = deadlineDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const end = start; // Point in time

    // Common fields
    const title = `${name} Deadline`;
    const details = `Deadline for ${name}.\n\n${description}\n\nWebsite: ${link}`;
    const location = place || "Online";

    // Google
    const google = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    // Yahoo
    // Yahoo format: https://calendar.yahoo.com/?v=60&TITLE=...&ST=...&ET=...&DESC=...&in_loc=...
    // Dates need to be YYYYMMDDThhmmss
    const yahoo = `https://calendar.yahoo.com/?v=60&TITLE=${encodeURIComponent(title)}&ST=${start}&ET=${end}&DESC=${encodeURIComponent(details)}&in_loc=${encodeURIComponent(location)}`;

    // Outlook Web
    // https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=...&enddt=...&subject=...&body=...&location=...
    const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&startdt=${deadlineDate.toISOString()}&enddt=${deadlineDate.toISOString()}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

    // iCal (.ics)
    // We create a data URI
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `URL:${link}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${details.replace(/\n/g, '\\n')}`,
        `LOCATION:${location}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const ics = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

    return { google, yahoo, outlook, ics };
};
