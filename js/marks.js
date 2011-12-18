//TODO: use templating system from wattools
//TODO: create a "editable in place" type of field which will update things automatically like magic

jQuery(function($){
	
	window.data = {};
	data.terms = new TermList();
	data.terms.add( new Term() );
	data.terms.at(0).get('courses').add( new Course({code: 'ECE254', name: 'Operating Systems'}) );
	data.terms.at(0).get('courses').at(0).get('components').add( new Component({name: 'Lab', weight: 30, marks: new MarkList()}) );
	data.terms.at(0).get('courses').at(0).get('components').at(0).get('marks').add( new Mark({name: 'Lab 1', total: 200, mark: 150}) );
	data.terms.at(0).get('courses').at(0).get('components').at(0).get('marks').add( new Mark({name: 'Lab 2', total: 200, mark: 180}) );
	data.terms.at(0).get('courses').at(0).get('components').add( new Component({name: 'Midterm', weight: 30}) );
	data.terms.at(0).get('courses').at(0).get('components').add( new Component({name: 'Final', weight: 30}) );

	window.app = new CoursesView({el:$('#app'), collection: data.terms.at(0).get('courses')});
	
	
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
