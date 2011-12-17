//TODO: selected_course does work?
//TODO: separate into multiple files?
//TODO: use templating system from wattools
jQuery(function($){

	window.data = {};
	var selected_course = 0; //TODO: put inside data
	
	// models and collections
	
	//Terms
	
	window.Term = Backbone.Model.extend({
		defaults: function() {
		  return {
			name:  '1A'
		  };
		}
	});
	
	window.TermList = Backbone.Collection.extend({
		model: Term
	});
	
	data.terms = new TermList();
	data.terms.add( new Term() );
	
	//Courses
	
	window.Course = Backbone.Model.extend({
		defaults: function() {
		  return {
			code:  'XXX 123',
			name:  'Default Course'
		  };
		}
	});
	
	window.CourseList = Backbone.Collection.extend({
		model: Course
	});
	
	data.terms.at(0).courses = new CourseList();
	data.terms.at(0).courses.add( new Course() );
	
	// Components
	
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
	
	data.terms.at(0).courses.at(0).components = new ComponentList();
	data.terms.at(0).courses.at(0).components.add( new Component() );
	
	//crap
	
	function new_component_form_submit(event) {
		event.preventDefault();
		var $course_code = $( "#course_code" );
		var $course_name = $( "#course_name" );
		var course_code = $course_code.val() || "ECE100A";
		selected_course = data.terms.at(0).courses.length;
		data.terms.at(0).courses.add( new Course({
			code: course_code,
			name: $course_name.val() || "New Course"
		}) );
		data.terms.at(0).courses.last().components = new ComponentList();
		data.terms.at(0).courses.last().components.add( new Component() );
		app.render();
	}

	function draw_new_component_form ( event, ui ) {
		$( ui.panel ).append( $('<div>').append($("#component-add-template").html()).submit(new_tab_form_submit));
		$("input:submit").button();
	}
	
	// Views

	// component view
	window.ComponentView = Backbone.View.extend({
		model: null,
		tagName: 'div',
		render: function(ui){
			$(ui).empty().append("<p>").text("This component has weight: " + this.model.get('weight'));
		}
	});

	// components view
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
	
	// course view
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
	
	function new_tab_form_submit(event) {
		event.preventDefault();
		var $course_code = $( "#course_code" );
		var $course_name = $( "#course_name" );
		var course_code = $course_code.val() || "ECE100A";
		selected_course = data.terms.at(0).courses.length;
		data.terms.at(0).courses.add( new Course({
			code: course_code,
			name: $course_name.val() || "New Course"
		}) );
		data.terms.at(0).courses.last().components = new ComponentList();
		data.terms.at(0).courses.last().components.add( new Component() );
		app.render();
	}

	function draw_new_tab_form ( event, ui ) {
		$( ui.panel ).append( $('<div>').append($("#course-add-template").html()).submit(new_tab_form_submit));
		$("input:submit").button();
	}
	
	// courses view
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

	window.app = new CoursesView({el:$('#app'), collection: data.terms.at(0).courses});
	
	app.render();
	
	/*
	$('#login').button({
		icons: {
			primary: "ui-icon-play"
		}
	}).click(function(){
		//TODO: login
		//https://cas.uwaterloo.ca/cas/login?service=
	});*/
	
});
