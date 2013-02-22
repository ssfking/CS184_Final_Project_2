Meteor.subscribe("all_rates");


  Meteor.Router.add({
    '/': 'welcome1',

    '/welcome': 'welcome1',
    '/rateCard': 'rateCard',
    '/posts/:id': function(id) {
      Session.set('postId', id);
      return 'post';
    }
  });

  Meteor.Router.filters({
    requireLogin: function(page) {
      var userId = Meteor.userId();
      if (userId) {
        return page;
      } else {
        return 'sign_in';
      }
    }
  });

  Meteor.Router.filter('requireLogin', {only: 'rateCard'})


  Template.sign_in.events = {
    'submit form': function(e) {
      e.preventDefault();
      Session.set('username', $(e.target).find('[name=username]').val())
    }
  }
  
  Template.welcome.username = function() { 
      return Session.get('username'); }
  
  Template.welcome.events = {
    'submit form': function(event, template) {
      event.preventDefault();
      var serviceName = template.find('#service_name').value;  // simpler, no jQuery
      // programmatic routing, using pushState()
      Meteor.user().profile.ratecard = serviceName;
      Meteor.Router.to('/posts/' + serviceName);
     },

    'click .logout': function(e) {
      e.preventDefault();
      Session.set('username', false);
    }
  }

  Template.welcome1.events = {
    'click #rateCard' : function(e) {
      console.log("yoooo");
      e.preventDefault();
      Meteor.Router.to('/rateCard');
    }
  }

  Template.post.helpers({
    id: function() { return Session.get('postId'); }
  })

  Template.rateCard.rates = function () {
    console.log("rates found: " + Rates.find()); 
    return Rates.find(); 
  }

  Template.rateCard.rate = function() {
    return this.rate;
  }
  Template.rateCard.events = {
    'click #submit':function(event, template) {
      var service = template.find("#service").value;
      var rate = template.find("#rate").value;
      if (rate != "" && service !="") {
        console.log("add rate card item");
        Rates.insert({userId: Meteor.userId(), service: service, rate:rate});
      }
    }
  }
