window.ComponentView = Backbone.View.extend({
	model: null,
	tagName: 'div',
	render: function(ui){
		$(ui).empty().append("<p>").text("This component has weight: " + this.model.get('weight'));
	}
});

window.ComponentsView = Backbone.View.extend({
	collection: null,
	course_views: null,
	tagName: 'div',
	render: function(){
		
		// create the course views for each tab
		this.component_views = [];
		for (var i=0; i < this.collection.length; i++){
			this.component_views.push(new ComponentView({model: this.collection.at(i)}));
		}
		
		var $el = $(this.el);
		//TODO: unique id necessary!
		var $tabs = $('<div id="component-tabs"><ul></ul></div>'); 
		$el.append($tabs);
		
		//create the tabs
		$tabs.tabs({
			//selected: selected_course, // we can't do this because the tabs are not there yet
			tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
			add: _.bind(function( event, ui ){
				if(ui.index == this.collection.length) {
					draw_new_component_form( event, ui );
				} else {
					this.component_views[ui.index].render( ui.panel );//we render all the way here because jquery ui only tells us which div to render in after the tabs are added
					//TODO: do this before creating all the views and/or create the views as i do this so i can pass the ui element to render into while creating
				}
			}, this)
		});
		
		//start building tab data
		for(var i = 0; i < this.collection.length; i++) {
			$tabs.tabs( "add", "#component-tab-"+i, this.collection.at(i).get('name'));
		}
		$tabs.tabs( "add", "#component-tab-" + this.collection.length, "<span class='ui-icon ui-icon-plusthick'>Add Course</span>");
		
		//select the right tab
		$tabs.tabs( "select", 0);
	}
});
