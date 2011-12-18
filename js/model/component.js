window.Component = Backbone.Model.extend({
	defaults: function() {
		return {
			name:  'Untitled Component',
			weight: 30,
			marks: new MarkList()
		}
	}
});

window.ComponentList = Backbone.Collection.extend({
	selected: 0, //which component is currently visible
	model: Component
});
