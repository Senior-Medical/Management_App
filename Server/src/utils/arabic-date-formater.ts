const dateFormaterOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit', 
  minute: '2-digit'
};
export const arabicDateFormater = new Intl.DateTimeFormat('ar-EG', dateFormaterOptions);