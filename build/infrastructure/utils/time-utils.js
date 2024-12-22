"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToCorrectFormat = convertTimeToCorrectFormat;
function convertTimeToCorrectFormat(time) {
    if (time instanceof Date) {
        return time.toISOString().substring(11, 19);
    }
    if (typeof time === 'string') {
        const dateObj = new Date(time);
        return dateObj.toISOString().substring(11, 19);
    }
    return '';
}
