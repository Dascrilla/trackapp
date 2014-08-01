UI.body.helpers({
	
showOverview: function(){
if (window.location.href.indexOf("#success") > -1) {
      return $("#modal-2").addClass('md-show');
   }
   setTimeout(function (){
           $('#modal-2').removeClass('md-show');
       }, 40000);
}
}); 