export const generateApplicationNumber = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let value = "";

  // 3 characters before /
  for (let i = 0; i < 3; i++) {
    value += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  value += "/";

  // 10 characters after /
  for (let i = 0; i < 10; i++) {
    value += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // ==
  value += "==";

  return value;
};
