
Template.demoList.helpers({
  demos: function() {
    return Demos.find({}, {sort: {dateset: -1}});;
  }, 

  demosInCollection: function(){
    if (Demos.find({userId: Meteor.userId()}).count() !== 0){
      return true; 
    }
      else { return false; }
  },

  ownDemo: function() {
  return this.userId == Meteor.userId(); 
  },

today: function(){
  		today = moment().format('MMM Do'); 
  		return today; 
  	},

  thisWeek: function(){
  		thisMonday = moment().day(1).format('Do'),
  		thisSunday = moment().day(7).format('Do'); 
  	return thisMonday + " - " + thisSunday; 
  }, 

  thisMonth: function(){
  	thisMonth = moment().format('MMMM');  		 
  	return thisMonth; 
  },

  userDailyDemoCount: function(){
  		today = moment().format('MM/DD/YYYY');
  		userId = Meteor.userId(); 
    	return Demos.find({userId: userId, dateset: today }, {reactive: false}).count(); 
  	 
  }, 
  
 userWeeklyDemoCount: function(){
 		thisMonday = moment().day(1).format('MM/DD/YYYY'),  
 		thisSunday = moment().day(7).format('MM/DD/YYYY'),
 		userId = Meteor.userId();  
 	return Demos.find({ userId: userId, dateset: {$gte: thisMonday, $lte: thisSunday} }, {reactive: false}).count();
 }, 

 userMonthlyDemoCount: function(){
 		theFirst = moment().date(1).format('MM/DD/YYYY'),  
 		theLast = moment().date(31).format('MM/DD/YYYY'), 
 		userId = Meteor.userId();
 	return Demos.find({ userId: userId, dateset: {$gte: theFirst, $lte: theLast} }, {reactive: false}).count();
 }
});

Template.demoList.events({
  'click #todays-demos': function(e){
    e.preventDefault(); 
    date1 = moment().format('MM/DD/YYYY'), 
    date2 = moment().format('MM/DD/YYYY'); 
    Session.set('filterByDates', [date1, date2]); 
    $('#todays-demos').toggleClass('selected');
    $('#weeks-demos').removeClass('selected');
    $('#months-demos').removeClass('selected');
  }, 

  'click #weeks-demos': function(e){
    e.preventDefault(); 
    date1 = moment().day(1).format('MM/DD/YYYY'), 
    date2 = moment().day(7).format('MM/DD/YYYY'); 
    Session.set('filterByDates', [date1, date2]);
    $('#weeks-demos').toggleClass('selected');
    $('#todays-demos').removeClass('selected');
    $('#months-demos').removeClass('selected');

  }, 

  'click #months-demos': function(e){
    e.preventDefault(); 
    date1 = moment().date(1).format('MM/DD/YYYY'), 
    date2 = moment().date(31).format('MM/DD/YYYY'); 
    Session.set('filterByDates', [date1, date2]);
    $('#months-demos').toggleClass('selected');
    $('#todays-demos').removeClass('selected');
    $('#weeks-demos').removeClass('selected');
  }
}); 