//TODO: use templating system from wattools
//TODO: create a "editable in place" type of field which will update things automatically like magic

jQuery(function($){
	
	window.data = {};
	data.terms = new TermList();
	data.terms.add( new Term() );
	data.terms.at(0).get('courses').add( new Course({code: 'ECE254', name: 'Operating Systems'}) );
	data.terms.at(0).get('courses').at(0).get('components').add( new Component({name: 'Lab', weight: 30}) );
	data.terms.at(0).get('courses').at(0).get('components').add( new Component({name: 'Midterm', weight: 30}) );
	data.terms.at(0).get('courses').at(0).get('components').add( new Component({name: 'Final', weight: 30}) );

	window.app = new CoursesView({el:$('#app'), collection: data.terms.at(0).get('courses')});
	
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
