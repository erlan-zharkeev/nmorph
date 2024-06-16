import { NmorphTimeTupleType } from './types';

export const formatTimestampToTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const timeArrayToTimestamp = (timeArray: NmorphTimeTupleType) => {
  const [hours, minutes, seconds] = timeArray;
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(seconds);
  now.setMilliseconds(0);
  return now.getTime();
};
