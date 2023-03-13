export function getPeriodTime(start: Date, end: Date) {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 0);

    return { start, end };
}
