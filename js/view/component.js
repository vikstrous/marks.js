window.ComponentView = Backbone.View.extend({
	model: null,
	tagName: 'div',
	initialize: function(){
		this.render();
	},
	render: function(){
		$(this.el).empty().append("<p>").text("Weight: " + this.model.get('weight')).append('<hr/>');
		var $mark_list = $('<div>');
		//render all components
		this.marks_view = new MarksView({el: $mark_list[0], collection: this.model.get('marks')});
		$(this.el).append($mark_list);
	}
});

window.ComponentsView = Backbone.View.extend({
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
		var $tabs = $('<div class="component-tabs"><ul></ul></div>'); 
		$el.empty().append($tabs);
		
		// set up tab handling
		$tabs.tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
			// write the tab data when the tab is added
			add: _.bind(function( event, ui ){
				if(ui.index == this.collection.length) {
					draw_new_component_form( event, ui );
				} else {
					this.component_views[ui.index] = new ComponentView({el:  ui.panel, model: this.collection.at(i)});
				}
			}, this),
			// update the selection
			select: _.bind(function(event, ui){
				this.collection.selected = ui.index;
			}, this)
		});
		
		// add tabs
		for(var i = 0; i < this.collection.length; i++) {
			$tabs.tabs( "add", "#component-tab-"+i, this.collection.at(i).get('name'));
		}
		$tabs.tabs( "add", "#component-tab-" + this.collection.length, "<span class='ui-icon ui-icon-plusthick'>Add Course</span>");
		
		// select the right tab
		$tabs.tabs( "select", this.collection.selected);
	}
});
