/* HELPERS */

/* Helper function the checks if a coverage item was published by the current user */

Template.dayItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }, 

  isToday: function(){
  	var now = moment(), 
  	today = moment(now).format('MM/DD/YYYY');
  	return this.date == today; 
  }, 
  
  isWeekNotToday: function(){
    var now = moment(), 
    today = moment(now).format('MM/DD/YYYY'),
    thisMonday = moment(now).day(1).format('MM/DD/YYYY'), 
    thisFriday = moment(now).day(5).format('MM/DD/YYYY'); 
    return this.date >= thisMonday && this.date <= thisFriday && this.date !== today; 
  },

  demosSet: function (){ 
    userId = Meteor.userId(),
    dayDemos = [];  
    dayDemos = Demos.find({userId: userId, dateset: this.date}).count(); 
    return dayDemos 
      }
});

Template.thisMonth.helpers({
  isMonthNotWeek: function(){
    var now = moment(), 
    today = moment(now).format('MM/DD/YYYY'),
    thisMonday = moment(now).day(1).format('MM/DD/YYYY');
    return this.date < thisMonday; 
  }, 
  demosSet: function (){ 
    userId = Meteor.userId(),
    dayDemos = [];  
    dayDemos = Demos.find({userId: userId, dateset: this.date}).fetch();
    return dayDemos.length;  
      }
});

Template.dayItem.events({ 

'click .inc-calls': function(e) {
e.preventDefault();
Meteor.call('incCalls', this._id); }, 

'click .inc-connects': function(e) {
e.preventDefault();
Meteor.call('incConnects', this._id); }, 

'click .inc-emails': function(e) {
e.preventDefault();
Meteor.call('incEmails', this._id); }, 

'click .inc-demos': function(e) {
e.preventDefault();
Meteor.call('incDemos', this._id); } 
});

