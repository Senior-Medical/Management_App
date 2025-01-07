const dateFormatterOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
};
export const arabicDateFormatter = new Intl.DateTimeFormat('ar-EG', dateFormatterOptions);