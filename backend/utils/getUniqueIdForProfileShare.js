const { customAlphabet } = require("nanoid");
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function getUniqueIdForPrifileShare() {
  const nanoid = customAlphabet(alphabet);
  // Generate a unique ID
  let uniqueId = nanoid(7);
  uniqueId = uniqueId + Math.floor(Math.random() * 100) + 10;
  return uniqueId;
}
module.exports = { getUniqueIdForPrifileShare };
