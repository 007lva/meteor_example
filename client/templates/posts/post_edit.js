Template.postEdit.events({
  "submit form": function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      _id: currentPostId,
      url: $(e.target).find("[name=url]").val(),
      title: $(e.target).find("[name=title]").val()
    };

    Meteor.call("postUpdate", postProperties, function(err, result) {
      if (err) {
        throwError(err.reason);
      }
      
      if (result && result.postExists) {
        return throwError("Post already exists");
      }
    });

    Router.go("postsList");
  },
  "click .delete": function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId, function(err) {
        if (err) { return alert(err.reason); }
      });
      Router.go("postsList");
    }
  }
});
