export const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const generateUUID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4()}${s4()}-${s4()}-4${s4().substr(0, 3)}-${s4().substr(0, 1)}${s4().substr(1, 3)}-${s4()}${s4()}${s4()}`;
};
