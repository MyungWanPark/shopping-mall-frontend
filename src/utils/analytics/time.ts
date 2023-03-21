import { eachDayOfInterval } from 'date-fns';

export const TIME_DIFF = 9 * 60 * 60 * 1000;

export function getPeriodTime(starts: Date, ends: Date) {
    const start = new Date(starts.setHours(0, 0, 0, 1) - TIME_DIFF);
    const end = new Date(ends.setHours(23, 59, 59, 0) - TIME_DIFF);

    return { start, end };
}

export function getBetweenTwoDates(start: Date, end: Date) {
    if (
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate()
    ) {
        return [start];
    }

    return eachDayOfInterval({
        start,
        end,
    });
}

export function backToGBTime(time: Date) {
    const GBTime = new Date(time.getTime() + TIME_DIFF);

    return GBTime;
}
