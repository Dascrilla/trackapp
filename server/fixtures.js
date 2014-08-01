if (Demos.find().count() === 0) {
  Demos.insert({
    dateset: '12/12/12',
    sfid: 'https://na11.salesforce.com/00QG000000m9c2o', 
    closed: 'phone'
  });
}

if (Days.find().count() === 0) {
  Days.insert({
    date: '12/12/12', 
    calls: 25,
    connects: 5, 
    emails: 245, 
  });
}
