//TODO: selected_course does work?
//TODO: separate into multiple files?
//TODO: use templating system from wattools

//global
selected_course = 0; //TODO: put inside data

jQuery(function($){
	
	window.data = {};
	data.terms = new TermList();
	data.terms.add( new Term() );
	data.terms.at(0).courses = new CourseList();
	data.terms.at(0).courses.add( new Course() );
	data.terms.at(0).courses.at(0).components = new ComponentList();
	data.terms.at(0).courses.at(0).components.add( new Component() );

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
