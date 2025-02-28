function getPublicProfileUrl(publicUserId) {
  // TODO:Add base url

  return "http://localhost:5173" + "/GetToKnowMe/" + publicUserId;
}
module.exports = getPublicProfileUrl;
