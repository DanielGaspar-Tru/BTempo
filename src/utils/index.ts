import {format} from 'date-fns';

export const formatHour = unixDate => {
  const date = new Date(unixDate * 1000);
  return format(date, 'HH:mm');
};

export const formatTemp = temp => {
  return `${Math.round(temp)}˚`;
};
