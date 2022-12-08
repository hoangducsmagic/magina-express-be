export const generateRandomString = (count: number) => {
  const sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';

  for (let i = 0; i < count; i++) {
    const idx = Math.random() * sym.length;

    str += sym.charAt(idx);
  }

  return str;
};

export const base64Encode = (str: string): string => {
  return new Buffer(str).toString('base64url');
};

const padLeft = (num: number) => num.toString().padStart(2, '0');

export const dateFormat = (date: Date): string => {
  return `${date.getFullYear()}/${padLeft(date.getMonth() + 1)}/${padLeft(
    date.getDate()
  )} ${padLeft(date.getHours())}:${padLeft(date.getMinutes())}:${padLeft(
    date.getSeconds()
  )}`;
};
