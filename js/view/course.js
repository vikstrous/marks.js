window.CourseView = Backbone.View.extend({
	model: null,
	tagName: 'div',
	render: function(ui){
		$(ui).empty().append("<p>").text("testing course:" + this.model.get('name'));
		var $comp_list = $('<div>');
		//render all components
		this.components_view = new ComponentsView({el: $comp_list[0], collection: this.model.components });
		this.components_view.render();
		$(ui).append($comp_list);
	}
});

window.CoursesView = Backbone.View.extend({
	collection: null,
	course_views: null,
	tagName: 'div',
	render: function(){
		// copy in the template
		$(this.el).empty().html($('#app-template').html());
		
		// create the course views for each tab
		this.course_views = [];
		for (var i=0; i < this.collection.length; i++){
			this.course_views.push(new CourseView({model: this.collection.at(i)}));
		}
		
		//create the tabs
		var $tabs = $('#course-tabs').tabs('destroy').tabs({
			//selected: selected_course, // we can't do this because the tabs are not there yet
			tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
			add: _.bind(function( event, ui ){
				if(ui.index == this.collection.length) {
					draw_new_tab_form( event, ui );
				} else {
					this.course_views[ui.index].render( ui.panel );
				}
			}, this)
		});
		
		//start building tab data
		for(var i = 0; i < this.collection.length; i++) {
			$tabs.tabs( "add", "#course-tab-"+i, this.collection.at(i).get('code'));
		}
		$tabs.tabs( "add", "#course-tab-" + this.collection.length, "<span class='ui-icon ui-icon-plusthick'>Add Course</span>");
		
		//select the right tab
		$tabs.tabs( "select", selected_course );
	}
});
