  // don't actually publish this
  var Posts = new Meteor.Collection('posts');
 
  
   
  Meteor.publish("all_rates", function() {
    return Rates.find();
  })
  

  
  Meteor.startup(function() {
    if (Posts.find().count() === 0) {
      console.log('added Post: ' + Posts.insert({foo: 'bar'}));
    }
    
    
    Meteor.Router.add({
      '/test-endpoint': 'SOME DATA!',
      '/second-test-endpoint': function() {
        console.log(this.request.body);
        return 'foo';
      }
    })

    Meteor.Router.add({
      '/posts/:id.xml': function(id) {
        return Posts.findOne(id).foo;
      }
    });
  });

