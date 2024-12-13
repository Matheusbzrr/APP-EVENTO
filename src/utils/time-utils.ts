export function convertTimeToCorrectFormat(time: string | Date): string {
    if (time instanceof Date) {
        return time.toISOString().substring(11, 19);
    }

    if (typeof time === 'string') {
        const dateObj = new Date(time);
        return dateObj.toISOString().substring(11, 19);
    }

    return '';
}