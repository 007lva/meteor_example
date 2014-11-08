Template.postSubmit.events({
  "submit form": function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find("[name=url]").val(),
      title: $(e.target).find("[name=title]").val()
    };

    Meteor.call("postInsert", post, function(err, result) {
      if(err) {
        throwError(err.reason);
      }

      if(result && result.postExists){
        throwError("Post already exists");
      }
    });

    Router.go("postsList");
  }
});
