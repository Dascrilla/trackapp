Meteor.publish('demos', function(filter) {
  if (filter) {
        return Demos.find({dateset: {$gte: filter[0], $lte: filter[1]} });
    }
  else {
    return Demos.find();
  }
}); 

Meteor.publish('days', function(){
	return Days.find(); 
});

Meteor.publish("allUsers", function () {
  return Meteor.users.find();
});
/*
Specify user fields to publish 
return Meteor.users.find({}, {
   fields: {
     'profile.email': 1
     'profile.name': 1
     'profile.createdAt': 1
}});
*/ 

Houston.add_collection(Meteor.users);
