import dayjs from "dayjs";

export function formatDisplayDate(date: Date, agoMode = true): string {

    const now = dayjs();
    const diff = now.diff(date, 'minute');

    if (agoMode) {
        if (diff < 1) { return 'just now'; }
        if (diff < 60) { return `${diff} min ago`; }
        if (diff < 60 * 24) { return `${Math.floor(diff / 60)}h ago`; }
    }

    // default
    return dayjs(date).format('YYYY-MM-DD HH:mm');

}