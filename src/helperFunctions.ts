export function createKey(length = 6) {
  let key = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
    counter += 1;
  }
  return key;
}

export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
