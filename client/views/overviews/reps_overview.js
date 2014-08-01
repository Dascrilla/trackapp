Template.repsOverview.helpers({
	users: function(){
	 return Meteor.users.find(); 
	}
});

today = function() {
	moment().format('MM/DD/YYYY');
}

Template.rep.helpers({

	repName: function(){
	var rep = Meteor.users.findOne({_id: this._id}); 
	if(rep){
			repEmail = rep.emails[0].address, 
			repArr = [], 
			repArr = repEmail.split('@');
			return repArr[0]; 
		}
		},

	repProfileName: function(){
	var rep = Meteor.users.findOne({_id: this._id}); 
	if(rep){
			return rep.profile.name;  
		}
		},
	
	repDailyDemos: function (){ 
		today = moment().format('MM/DD/YYYY'), 
		repDemosToday = [];  
		repDemosToday = Demos.find({userId: this._id, dateset: today}).fetch();
		return repDemosToday.length;  
			}, 

	repWeeklyDemos: function(){
		thisMonday = moment().day(1).format('MM/DD/YYYY'), 
		thisFriday = moment().day(5).format('MM/DD/YYYY'), 
		repDemosWeek = []; 
		repDemosWeek = Demos.find({userId: this._id, dateset: {$gte: thisMonday, $lte: thisFriday}}).fetch();
		return repDemosWeek.length; 
	}, 
	
	repMonthlyDemos: function(){
		 theFirst= moment().date(1).format('MM/DD/YYYY'), 
		 theLast= moment().day(31).format('MM/DD/YYYY'), 
		repDemosWeek = []; 
		repDemosWeek = Demos.find({userId: this._id, dateset: {$gte: theFirst, $lte: theLast}}).fetch();
		return repDemosWeek.length; 
	}

});


