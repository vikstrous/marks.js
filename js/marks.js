//TODO: selected_course doesn't work
//TODO: separate into multiple files?
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
			name:  'New Course'
		  };
		}
	});
	
	window.CourseList = Backbone.Collection.extend({
		model: Course
	});
	
	data.terms.at(0).courses = new CourseList();
	data.terms.at(0).courses.add( new Course() );
	
	// Views
	
	// courses
	window.CourseView = Backbone.View.extend({
		tagName:  'div',
		render: function(ui){
			$(ui).append("<p>").text("testing course:" + this.model.get('name'));
		}
	});
	
	// terms
	window.CoursesView = Backbone.View.extend({
		tagName: 'div',
		render: function(){
			$(this.el).empty().html($('#app-template').html());
			
			//create the course views for each tab
			this.course_views = [];
			for (var i=0; i < this.collection.length; i++){
				this.course_views.push(new CourseView({model: this.collection.at(i)}));
			}
			
			//create the tabs
			var $tabs = $('#course-tabs').tabs('destroy').tabs({
				selected: selected_course,
				tabTemplate: "<li><a href='#{href}'>#{label}</a></li>",
				add: _.bind(function( event, ui ) {
					if(ui.index == this.collection.length) {
						$( ui.panel ).append( $('<div>').append($("#course-add-template").html()).submit(function (event) {
							event.preventDefault();
							var $course_code = $( "#course_code" );
							var $course_name = $( "#course_name" );
							var course_code = $course_code.val() || "New Course";
							selected_course = data.terms.at(0).courses.length;
							data.terms.at(0).courses.add( new Course({
								code: course_code,
								name: $course_name.val() || "New Course"
							}) );
							app.render();
						}) ); //TODO: move this function?
					} else {
						this.course_views[ui.index].render( ui.panel );//TODO: remmeber to render within the panel
					}
				}, this)
			});
			
			//start building tab data
			for(var i = 0; i < data.terms.at(0).courses.length; i++) {
				$tabs.tabs( "add", "#course-tab-"+i, data.terms.at(0).courses.at(i).get('code'));
			}
			$tabs.tabs( "add", "#course-tab-" + data.terms.at(0).courses.length, "<span class='ui-icon ui-icon-plusthick'>Add Course</span>");
			
			$("input:submit").button();
		}
	});

	window.app = new CoursesView({el:$('#app'), collection: data.terms.at(0).courses});
	
	app.render();
	
	$('#login').button({
		icons: {
			primary: "ui-icon-play"
		}
	}).click(function(){
		//TODO: login
		//https://cas.uwaterloo.ca/cas/login?service=
	});
	
});