"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arabicDateFormatter = void 0;
const dateFormatterOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
exports.arabicDateFormatter = new Intl.DateTimeFormat('ar-EG', dateFormatterOptions);
//# sourceMappingURL=arabic-date-formatter.js.map