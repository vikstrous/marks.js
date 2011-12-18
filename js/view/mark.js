window.MarkView = Backbone.View.extend({
	model: null,
	tagName: 'div',
	initialize: function(){
		this.render();
	},
	render: function(){
		$(this.el).empty().text(this.model.get('name') + ': ' + this.model.get('mark') + ' / ' + this.model.get('total'));
	}
});

window.MarksView = Backbone.View.extend({
	collection: null,
	course_views: null,
	tagName: 'div',
	initialize: function(){
		this.collection.bind('add', this.render, this);
		this.render();
	},
	render: function(){
		// create the course views for each tab
		this.component_views = [];
		
		var $el = $(this.el);
		$el.empty();
		
		// write data
		for(var i = 0; i < this.collection.length; i++) {
			var $div = $('<div>');
			this.component_views[i] = new MarkView({el: $div[0], model: this.collection.at(i)});
			$el.append($div)
		}
	}
});
