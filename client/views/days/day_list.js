Template.dayList.helpers({
	days: function() {
		return Days.find({userId: Meteor.userId()}, {sort: {date: 1}});
	}, 

	daysInCollection: function(){
		if (Days.find({userId: Meteor.userId()}).count() !== 0){
			return true; 
		}
			else { return false; }
	},
	
 ownDay: function() {
	return this.userId == Meteor.userId(); 
	}, 
 
 daysThisMonth: function() {
		return Days.find({userId: Meteor.userId()}, {sort: {date: -1}});
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


