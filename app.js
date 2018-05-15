var express = require('express');
var fs = require('fs');

var app = express();

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
};

app.use(allowCrossDomain);


/*listen for json update*/
app.get('/update', function(req, res) {
  
  fs.readFile('data.json', function(err, data) {
    if (err) {
      throw err;
    } else { 
      var allItems = JSON.parse(data);
      allItems.push(req.query);
      fs.writeFile('data.json', JSON.stringify(allItems), function (err) {
        if (err) {
          throw err;
        } else {
          var newItem = allItems.slice(-1)[0];
          res.send('new item successfully added and is '+ newItem.name + ' - ' + newItem.date);
          console.log(allItems);
        } 
      });
    }
  });

});


/*listen for start current date checking*/
app.get('/check', function(req, res) {
    var date = req.query.date;
    fs.readFile('data.json', function(err, data) {
      if (err) {
        throw err;
      } else {
        var allItems = JSON.parse(data),
            curItems = '';
        allItems.forEach(function(item, index) {
          //console.log(item.date);
          var politeDate = item.date.slice(0, -5);
          if(politeDate == date) {
            curItems += 'today is ' + item.name + '\'s birthday: ' + item.date + '<br>';
          }
        });
        res.send(curItems); 
        console.log(curItems);
      }
    });
});

app.listen(8000);