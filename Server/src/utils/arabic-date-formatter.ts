const dateFormatterOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit', 
  minute: '2-digit'
};
export const arabicDateFormatter = new Intl.DateTimeFormat('ar-EG', dateFormatterOptions);