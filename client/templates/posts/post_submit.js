Template.postSubmit.events({
  "submit form": function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find("[name=url]").val(),
      title: $(e.target).find("[name=title]").val()
    };

    var errors = validatePost(post);
    
    if (errors.title || errors.url) {
      return Session.set("postSubmitErrors", errors);
    }

    Meteor.call("postInsert", post, function(err, result) {
      if(err) {
        return throwError(err.reason);
      }

      if(result && result.postExists){
        throwError("Post already exists");
      }
    });

    Router.go("postsList");
  }
});

Template.postSubmit.created = function() {
  Session.set("postSubmitErrors", {});
};

Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get("postSubmitErrors")[field];
  },
  errorClass: function(field) {
    return !!Session.get("postSubmitErrors")[field] ? "has-error" : "";
  }
});
