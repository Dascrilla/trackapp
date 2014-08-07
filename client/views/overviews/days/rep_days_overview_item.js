/* HELPERS */

/* Helper function the checks if a coverage item was published by the current user */

Template.repWeekOverview.helpers({
  
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
    thisDay = Days.findOne({_id: this._id}).date;
    return Demos.find({userId: this._id, dateset: thisDay}).count(); 
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
    return Demos.find({userId: this._id, dateset: this.date}).count();  
      }
});

