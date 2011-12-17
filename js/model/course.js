window.Course = Backbone.Model.extend({
	defaults: function() {
	  return {
		code:  'XXX 123',
		name:  'Default Course'
	  };
	}
});

window.CourseList = Backbone.Collection.extend({
	model: Course
});
