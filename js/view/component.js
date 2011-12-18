window.ComponentView = Backbone.View.extend({
	model: null,
	tagName: 'div',
	render: function(){
		$(this.el).empty().append("<p>").text("This component has weight: " + this.model.get('weight'));
	}
});

window.ComponentsView = Backbone.View.extend({
	collection: null,
	course_views: null,
	tagName: 'div',
	render: function(){
		
		// create the course views for each tab
		this.component_views = [];
		
		var $el = $(this.el);
		//TODO: unique id may be necessary!
		var $tabs = $('<div class="component-tabs"><ul></ul></div>'); 
		$el.append($tabs);
		
		//create the tabs
		$tabs.tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
			add: _.bind(function( event, ui ){
				if(ui.index == this.collection.length) {
					draw_new_component_form( event, ui );
				} else {
					this.component_views[ui.index] = new ComponentView({el:  ui.panel, model: this.collection.at(i)});
					this.component_views[ui.index].render();
				}
			}, this),
			select: _.bind(function(event, ui){
				this.collection.selected = ui.index;
			}, this)
		});
		
		//start building tab data
		for(var i = 0; i < this.collection.length; i++) {
			$tabs.tabs( "add", "#component-tab-"+i, this.collection.at(i).get('name'));
		}
		$tabs.tabs( "add", "#component-tab-" + this.collection.length, "<span class='ui-icon ui-icon-plusthick'>Add Course</span>");
		
		//select the right tab
		$tabs.tabs( "select", this.collection.selected);
	}
});
