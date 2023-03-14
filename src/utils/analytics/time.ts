import { eachDayOfInterval } from 'date-fns';

export function getPeriodTime(start: Date, end: Date) {
    // start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    return { start, end };
}

export function getBetweenTwoDates(start: Date, end: Date) {
    console.log(`start = ${start} end = ${end} in getBetween`);
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
