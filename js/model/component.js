window.Component = Backbone.Model.extend({
	defaults: function() {
	  return {
		name:  'Component 1',
		weight: 30
	  };
	}
});

window.ComponentList = Backbone.Collection.extend({
	model: Component
});
