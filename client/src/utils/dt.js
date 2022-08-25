const formatDatetime = (dt, options) => {
  if (typeof dt === 'string') {
    dt = new Date(dt);
  }
  return dt.toLocaleString('en-US', options);
};

const bindFormat = options => dt => formatDatetime(dt, options);

export const datetimeToMessageFormat = bindFormat({
  year: '2-digit',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

export const datetimeToChatFormat = bindFormat({
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
