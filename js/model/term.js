window.Term = Backbone.Model.extend({
	defaults: function() {
	  return {
		name:  '1A',
		courses: new CourseList()
	  };
	}
});

window.TermList = Backbone.Collection.extend({
	model: Term
});
