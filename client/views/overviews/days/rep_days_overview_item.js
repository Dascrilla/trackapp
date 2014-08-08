/* HELPERS */

/* Helper function the checks if a coverage item was published by the current user */

Template.repWeekOverview.helpers({
  days: function(){
      return Days.find(); 
  },

  demos: function(){
    return Demos.find(); 
  },
  
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }, 

  isToday: function(){
  	today = moment().format('MM/DD/YYYY');
  	return this.date == today; 
  },

  isWeekNotToday: function(){
    today = moment().format('MM/DD/YYYY'),
    thisMonday = moment().day(1).format('MM/DD/YYYY'), 
    thisFriday = moment().day(5).format('MM/DD/YYYY'); 
    return this.date >= thisMonday && this.date <= thisFriday && this.date !== today; 
  },

  demosSet: function (){ 
    pathArr = document.location.pathname.split('days/'); 
    return Demos.find({userId: pathArr[1], dateset: this.date}).count(); 
      }
  });

Template.repMonthOverview.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }, 

  isMonthNotWeek: function(){
    today = moment().format('MM/DD/YYYY'),
    thisMonday = moment().day(1).format('MM/DD/YYYY');
    return this.date < thisMonday; 
  }, 

  demosSet: function (){ 
    pathArr = document.location.pathname.split('days/'); 
    return Demos.find({userId: pathArr[1], dateset: this.date}).count();  
      }
});

