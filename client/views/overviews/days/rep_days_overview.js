Template.repDaysOverview.helpers({
	days: function() {
		return Days.find({userId: this._id}, {sort: {date: 1}});
	}, 
domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }, 

daysInCollection: function(){
	if (Days.find({userId: this._id}).count() !== 0){
		return true; 
	}
	else { return false; }
},
	
 ownDay: function() {
	return this.userId == this._id; 
	}, 
 
 daysThisMonth: function() {
		return Days.find({userId: this._id}, {sort: {date: -1}});
	},

thisWeekName: function(){
		today = moment(), 
		thisMonday = today.day(1).format('Do'),
		thisFriday = today.day(5).format('Do');
		return thisMonday + "-" + thisFriday; 
	},
thisMonthName: function(){
		return moment().format('MMMM') + " " + moment().date(1).format('Do') + " - " + moment().date(31).format('Do'); 
	}

}); 