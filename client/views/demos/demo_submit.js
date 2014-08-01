/* EVENT HANDLERS */

Template.demoSubmit.rendered=function() {
    $('#my-datepicker').datepicker({
    todayBtn: "linked",
    autoclose: true,
    todayHighlight: true
});
}

Template.demoSubmit.helpers({
  today: function () {
    return moment().format('MM/DD/YYYY');
}
});

Template.demoSubmit.events({
  /* Canel handler  */
  'click .cancel': function(e){
    e.preventDefault(); 
    Router.go('demoList'); 
  }, 
  /* Submit handler  */
  'submit form': function(e) {
    e.preventDefault();
  /* Defines the object handler  */
  /* Does "var" bind the object to submit.js only? TODO find a way to combine submit and edit objects */
  var demo = {
      dateset: $(e.target).find('[name=dateset]').val(), 
      sfid: $(e.target).find('[name=sfid]').val(),
      closed: $(e.target).find('[name=closed]').val()
    }

/*Error handler for submit*/
/*Why is this code alot different that edit.js. TODO refactor the edit and submit in same template with {{#if}} */
Meteor.call('demo', demo, function(error, id) { 
  if (error) {
// display the error to the user
throwError(error.reason);
if (error.error === 302) 
  Router.go('demoList');  
} else {
Router.go('demoList');  

} });
} });

