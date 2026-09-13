const generateCode = () => {
  /**
   * Generates a 6 character long unique short code for URLs which contains on a-z, A-Z, and 0-9.
   */

  const mainString =
    "abcdefghijklmnopgrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    shortCode += mainString.charAt(Math.floor(Math.round() * 62));
  }
  return shortCode;
};

export default generateCode;
