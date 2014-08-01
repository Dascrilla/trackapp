
/* HELPERS */

/* Returns the coverage item you want to edit */

Template.dayEdit.rendered=function() {
    $('#my-datepicker').datepicker({
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});
}

Template.dayEdit.helpers({ 
	day: function() {
		return Days.findOne(Session.get('currentDayId')); 
	}
});

/* EVENT HANDLERS */

/* Cancel handler */
Template.dayEdit.events({ 
	'click .cancel':function(e){
		e.preventDefault(); 
	Router.go('dayList'); 
	}, 

/* Submit  */
'submit form': function(e) {
e.preventDefault();
var currentDayId = this._id;

/* Defines object CoverageProperties and binds them to HTML "name" attrib.*/ 
var dayProperties = {
      date: $(e.target).find('[name=date]').val(), 
      calls: parseInt($(e.target).find('[name=calls]').val()),
      connects: parseInt($(e.target).find('[name=connects]').val()),
      emails: parseInt($(e.target).find('[name=emails]').val())
}

/* Updates the current coverage with the new properties. Handles Error  */
Days.update(currentDayId, {$set: dayProperties}, function(error){
 if (error) {
// display the error to the user
alert(error.reason); 
} 
else {
	Router.go('dayList'); 
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
 var currentDayId = this._id;
Days.remove(currentDayId, function(error){
 	if(error){
 	alert(error.reason); 
 	}
 	else{
 		Router.go('dayList');
 	}
 	}); 
} 
}
});