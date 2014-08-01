Demos = new Meteor.Collection('demos');

Demos.allow({
      insert: function () { return true; },
      update: ownsDocument, 
      remove: ownsDocument
});

Meteor.methods({

demo: function(demoAttributes) {
var user = Meteor.user(),
demoWithSameSfid = Demos.findOne({sfid: demoAttributes.sfid}); 
// ensure the user is logged in
if (!user)
throw new Meteor.Error(401, "You need to login!");
// ensure the post has a title
if (!demoAttributes.sfid)
throw new Meteor.Error(422, 'Please fill in all fields!');
// check that there are no previous coverages with the same link
if (demoAttributes.sfid && demoWithSameSfid) { throw new Meteor.Error(302,
'This lead already has a demo assigned!',
demoWithSameSfid._id); }


// pick out the whitelisted keys
var demo = _.extend(_.pick(demoAttributes, 'dateset', 'sfid', 'closed'), { 
userId: user._id,
created: new Date().getTime()
});

var demoId = Demos.insert(demo);
return demoId; 
}, 
});