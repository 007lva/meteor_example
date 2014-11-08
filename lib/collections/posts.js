Posts = new Mongo.Collection("posts");

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id 
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    Posts.insert(post);
  },
  postUpdate: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      _id: String,
      title: String,
      url: String
    });

    var postWithSameLink = Posts.find({url: postAttributes.url}).fetch();

    console.log("postWithSameLink: " + postWithSameLink.length); 
    
    if (postWithSameLink.length > 0) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    Posts.update(postAttributes._id, {$set: {url: postAttributes.url, title: postAttributes.title}});
  }
});

Posts.allow({
  //update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});
/*
Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});
*/
