export function formatTimestamp(createdAt) {
    if(!createdAt)return ""
    const date = new Date(createdAt);
    const now = new Date();

    // Format time as HH:mm
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const time = date.toLocaleTimeString("en-US", timeOptions);

    // Check if the date is today
    if (date.toDateString() === now.toDateString()) {
        // Same day: return time only
        return time;
    }

    // Check if the date is yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        // Previous day: return 'Yesterday' and time
        return `Yesterday ${time}`;
    }

    // Older than yesterday: format based on week or more
    const differenceInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (differenceInDays < 7) {
        // Less than a week ago: return day and time
        const dayOptions = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", dayOptions);
        return `${day} ${time}`;
    } else {
        // More than a week ago: return date and time
        const dateOptions = { month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", dateOptions);
        return `${formattedDate} at ${time}`;
    }
}
