
/* HELPERS */

/* Returns the coverage item you want to edit */

Template.demoPage.rendered = function() {
    $('#my-datepicker').datepicker({
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});
}

Template.demoPage.helpers({ 
	demo: function() {
		return Demos.findOne(Session.get('currentDemoId')); 
	}
});

/* EVENT HANDLERS */

/* Cancel handler */
Template.demoPage.events({ 
	'click .cancel':function(e){
		e.preventDefault(); 
	Router.go('demoList'); 
	}, 

/* Submit  */
'submit form': function(e) {
e.preventDefault();
var currentDemoId = this._id;

/* Defines object CoverageProperties and binds them to HTML "name" attrib.*/ 
var demoProperties = {
      dateset: $(e.target).find('[name=dateset]').val(), 
      sfid: $(e.target).find('[name=sfid]').val(),
      closed: $(e.target).find('[name=closed]').val()
}

/* Updates the current coverage with the new properties. Handles Error  */
Demos.update(currentDemoId, {$set: demoProperties}, function(error){
 if (error) {
// display the error to the user
alert(error.reason); 
} 
else {
	Router.go('demoList'); 
	//Router.go('coveragePage', {_id: currentCoverageId}); 
}
}); 
},

/* Delete handler */

/* Asks for confirmation, checks if there's an error, if not deletes the item and routes back to coveragesList */
/* TODO Find a better way to handle errors/form validation */
'click .delete': function(e) { 
e.preventDefault();
if (confirm("Delete this Item?")) {
 var currentDemoId = this._id;
Demos.remove(currentDemoId, function(error){
 	if(error){
 	alert(error.reason); 
 	}
 	else{
 		Router.go('demoList');
 	}
 	}); 
} 
}
});