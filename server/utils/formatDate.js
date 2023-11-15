const dayjs = require('dayjs');

const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const formatDateHour = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:s');
};

module.exports = { formatDate, formatDateHour };
