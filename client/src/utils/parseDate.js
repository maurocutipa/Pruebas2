import dayjs from 'dayjs';

export const parseDDMMYYYY = (date) => {
  const dateFormated = dayjs(date).format('DD/MM/YYYY ');

  return dateFormated;
};

export const parseDDMMYYYYHHMMSS = (date) => {
  const dateFormated = dayjs(date).format('DD/MM/YYYY HH:mm:ss');

  return dateFormated;
};

export const createDate = (date) => {
  const newDate = dayjs(date);
  return newDate;
};

export const parseDDMMYYYYHHMM = (date, hour) => {
  const hourFormated = parseHHMM(hour);
  const dateFormated = parseDDMMYYYY(date);

  return `${dateFormated} ${hourFormated}`;
};

export const parseHHMM = (hour) => {
  const [hours, minutes] = hour.split(':');

  return `${hours}:${minutes}`;
};
