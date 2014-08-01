/* HELPERS */

/* Helper function the checks if a coverage item was published by the current user */
Template.demoOverviewItem.helpers({

/* Something to do with linking the specific item and changing the URL*/
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }, 
    users: function(){
    return Meteor.users.find(); 
  },

  hasProfile: function(){
    var rep = Meteor.users.findOne({_id: this.userId}); 
      if (rep) {
      repEmail = rep.emails[0].address, 
      repArr = [], 
      repArr = repEmail.split('@');

      if (typeof repArr[0] == 'undefined'){return true; }
      else{false;}
    }
  }, 

  ownerRep: function(){
  	var rep = Meteor.users.findOne({_id: this.userId}); 
    if (rep) {
     repEmail = rep.emails[0].address, 
      repArr = [], 
      repArr = repEmail.split('@');
      return repArr[0]; 
    }
    }, 

  ownerRepProfile: function(){
    var rep = Meteor.users.findOne({_id: this.userId}); 
    if(rep){
        return rep.profile.name;  
      }
    }
});
