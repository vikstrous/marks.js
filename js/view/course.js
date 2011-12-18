window.CourseView = Backbone.View.extend({
	model: null,
	tagName: 'div',
	render: function(){
		$(this.el).empty().append("<p>").text("testing course:" + this.model.get('name'));
		var $comp_list = $('<div>');
		//render all components
		this.components_view = new ComponentsView({el: $comp_list[0], collection: this.model.get('components')});
		this.components_view.render();
		$(this.el).append($comp_list);
	}
});

window.CoursesView = Backbone.View.extend({
	collection: null,
	course_views: null,
	tagName: 'div',
	render: function(){
		// create the course views for each tab
		this.course_views = [];
		
		var $el = $(this.el);
		//TODO: unique id may be necessary!
		var $tabs = $('<div class="course-tabs"><ul></ul></div>'); 
		$el.empty().append($tabs);
		
		//create the tabs
		$tabs.tabs({
			tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
			add: _.bind(function( event, ui ){
				if(ui.index == this.collection.length) {
					draw_new_tab_form( event, ui );
				} else {
					this.course_views[ui.index] = new CourseView({el: ui.panel, model: this.collection.at(i)});
					this.course_views[ui.index].render();
				}
			}, this),
			select: _.bind(function(event, ui){
				this.collection.selected = ui.index;
			}, this)
		});
		
		//start building tab data
		for(var i = 0; i < this.collection.length; i++) {
			$tabs.tabs( "add", "#course-tab-"+i, this.collection.at(i).get('code'));
		}
		$tabs.tabs( "add", "#course-tab-" + this.collection.length, "<span class='ui-icon ui-icon-plusthick'>Add Course</span>");
		
		//select the right tab
		$tabs.tabs( "select", this.collection.selected );
	}
});
