ownsDocument = function(userId, doc) {
  return !doc.userId || (doc && doc.userId === userId);
};
