export const to12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(':');
    const hourNumber = parseInt(hour, 10);
    const period = hourNumber < 12 ? 'AM' : 'PM';
    const hour12 = hourNumber <= 12 ? hourNumber : hourNumber - 12;
    return `${hour12}:${minute} ${period}`;
  };
  