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

