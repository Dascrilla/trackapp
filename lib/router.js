/*subscriptions that WaitOn on the subscriptions to be loaded, displaying loading spinner in the interm */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
   waitOn: function() { 
    return  Meteor.subscribe('days'), 
            Meteor.subscribe('allUsers'); 
   }
});

/*Router map*/
Router.map(function() {
  this.route('entrySignIn', {path: '/home'});
  this.route('dayList', {path: '/'});
  this.route('profile', {path: '/profile'});


  this.route('dayList', {
  	path: '/days', 
  	waitOn: function() {
      return Meteor.subscribe('demos');
    },
     onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('dayList', {
  	path: '/dashboard', 
  	waitOn: function() {
      return Meteor.subscribe('demos');
    }, 
     onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('demoList', {
    path: '/demos', 
    waitOn: function() {
      return Meteor.subscribe('demos', Session.get('filterByDates'));
    }, 
     onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    },
     onStop: function() {
      Session.set('filterByDates', undefined);
    }
  });

  this.route('demosOverview', {
    path: '/demos/overview', 
    waitOn: function() {
      return Meteor.subscribe('demos', Session.get('filterByDates')), 
             Meteor.subscribe('days'),    
             Meteor.subscribe('allUsers');
    },
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    },
    onStop: function() {
      Session.set('filterByDates', undefined);
    },
  }); 

  this.route('demoPage', {
    path: '/demos/:_id',
    waitOn: function() {
      return Meteor.subscribe('demos');
    },
    data: function() { return Demos.findOne(this.params._id); }, 
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });

  this.route('demoEdit', {
      path: '/demos/:_id/edit',
      waitOn: function() {
      return Meteor.subscribe('demos');
    },
      data: function() { return Demos.findOne(this.params._id); },
      onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
});
  this.route('demoSubmit', {
    path: '/submit', 
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });
 this.route('daySubmit', {
    path: 'days/submit', 
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  });
  this.route('dayEdit', {
    path: '/days/:_id/edit',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    },
    data: function() { return Days.findOne(this.params._id); }
    });

  this.route('repsOverview', {
    path: '/reps/overview', 
     waitOn: function() {
      return Meteor.subscribe('demos'), 
             Meteor.subscribe('allUsers'); 
    },
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  }); 

});
 
/*requires the user logs in otherwise routes to Access Denied*/
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    this.stop();
  }
}

Router.onBeforeAction(requireLogin, {only: 'demoSubmit'})