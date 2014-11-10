Template.commentSubmit.created = function() {
  Session.set("commentSubmitErrors", {});
};

Template.commentSubmit.helpers({
  errorMessages: function(field) {
    return Session.get("commentSubmitErrors");
  },
  errorClass: function(field) {
    return Session.get("commentSubmitErrors")[field] ? "has-error" : "";
  }
});

Template.commentSubmit.events({
  "submit form": function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find("[name=body]");
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};

    if (!comment.body) {
      errors.body = "Please write some content";
      return Session.get("commentSubmitErrors", errors);
    }

    Meteor.call("commentInsert", comment, function(err, commentId) {
      if (err) {
        throwError(err.reason);
      } else {
        $body.empty(); 
      }
    });
  }
});
