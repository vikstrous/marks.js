window.Component = Backbone.Model.extend({
	defaults: function() {
	  return {
		name:  'Component 1',
		weight: 30
	  };
	}
});

window.ComponentList = Backbone.Collection.extend({
	selected: 0, //which component is currently visible
	model: Component
});
