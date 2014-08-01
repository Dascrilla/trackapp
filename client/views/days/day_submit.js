/* EVENT HANDLERS */

Template.daySubmit.rendered=function() {
    $('#my-datepicker').datepicker({
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});
}

Template.daySubmit.helpers({
  today: function () {
    var now = moment(); 
    return moment(now).format('MM/DD/YYYY');
}
});

Template.daySubmit.events({
  /* Canel handler  */
  'click .cancel': function(e){
    e.preventDefault(); 
    Router.go('dayList'); 
  }, 

  /* Submit handler  */
  'submit form': function(e) {
    e.preventDefault();
    
  /* Defines the object handler  */
  /* Does "var" bind the object to submit.js only? TODO find a way to combine submit and edit objects */
  var day = {
      date: $(e.target).find('[name=date]').val(), 
      calls: parseInt($(e.target).find('[name=calls]').val()),
      connects: parseInt($(e.target).find('[name=connects]').val()),
      emails: parseInt($(e.target).find('[name=emails]').val()) 
       }


    
/*Error handler for submit*/
/*Why is this code alot different that edit.js. TODO refactor the edit and submit in same template with {{#if}} */
Meteor.call('day', day, function(error, id) { 
  if (error) {
// display the error to the user
throwError(error.reason);
if (error.error === 302) 
  Router.go('dayList');  
} else {
Router.go('dayList');  

} });
} });

