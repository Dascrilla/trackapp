Days = new Meteor.Collection('days');

Days.allow({
	insert: function () { return true; },
	update: ownsDocument,
	remove: ownsDocument
});

Meteor.methods({

	day: function(dayAttributes) {
		var user = Meteor.user(),
	dayWithSameUserDate= Days.findOne({date: dayAttributes.date, userId: user._id});

// ensure the user is logged in
if (!user)
	throw new Meteor.Error(401, "You need to login!");
// ensure form validation
if (!dayAttributes.date)
	throw new Meteor.Error(422, 'Please fill in at least the date');
// check that there are no previous records that would be duplicates
if (dayAttributes.date && dayWithSameUserDate) { throw new Meteor.Error(302,
	'You already have a record for that date!',
	dayWithSameUserDate._id); }

// pick out the whitelisted keys
var day = _.extend(_.pick(dayAttributes, 'date', 'calls', 'connects', 'emails', 'userId'),
	{
		userId: user._id,
		created: new Date().getTime()
	});
var dayId = Days.insert(day);
return dayId;
	},

		incCalls: function(dayId) {
			Days.update({_id: dayId}, {$inc: {calls: 1}
			}); },
		incConnects: function(dayId) {
			Days.update({_id: dayId}, {$inc: {connects: 1}
			}); },
		incEmails: function(dayId) {
			Days.update({_id: dayId}, {$inc: {emails: 1}
			}); }

});
