window.Term = Backbone.Model.extend({
	defaults: function() {
	  return {
		name:  '1A'
	  };
	}
});

window.TermList = Backbone.Collection.extend({
	model: Term
});
