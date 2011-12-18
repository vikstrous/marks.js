function new_component_form_submit(event) {
	event.preventDefault();
	var $component_name = $( ".component_name", this );
	var $component_weight = $( ".component_weight", this );
	var component_name = $component_name.val() || "New Component";
	data.terms.at(0).get('courses').at(data.terms.at(0).get('courses').selected).get('components').selected = data.terms.at(0).get('courses').at(data.terms.at(0).get('courses').selected).get('components').length;
	data.terms.at(0).get('courses').at(data.terms.at(0).get('courses').selected).get('components').add( new Component({
		name: component_name,
		weight: $component_weight.val() || 100
	}) );
}

function draw_new_component_form ( event, ui ) {
	$( ui.panel ).append( $('<div>').append($("#component-add-template").html()).submit(new_component_form_submit));
	$("input:submit").button();
}

function new_tab_form_submit(event) {
	event.preventDefault();
	var $course_code = $( ".course_code", this );
	var $course_name = $( ".course_name", this );
	var course_code = $course_code.val() || "ECE100A";
	data.terms.at(0).get('courses').selected = data.terms.at(0).get('courses').length;
	data.terms.at(0).get('courses').add( new Course({
		code: course_code,
		name: $course_name.val() || "New Course"
	}) );
}

function draw_new_tab_form ( event, ui ) {
	$( ui.panel ).append( $('<div>').append($("#course-add-template").html()).submit(new_tab_form_submit));
	$("input:submit").button();
}

