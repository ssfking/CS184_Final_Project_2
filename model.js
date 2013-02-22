Rates = new Meteor.Collection("rates");
Rates.allow({
  insert:function( userId, rate) {
  return true;
  }
});
