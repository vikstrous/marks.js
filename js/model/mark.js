window.Mark = Backbone.Model.extend({
	defaults: function() {
		return {
			name:  'Untitled Mark',
			total: 100,
			mark: 90
		}
	}
});

window.MarkList = Backbone.Collection.extend({
	model: Mark
});
