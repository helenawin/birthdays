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
  update(req.query, 'data.json');       //main function to update file
});

app.listen(8000);

/*start current date checking*/
var today = new Date(); 
setInterval(function() {
  check(today, 'data.json');       //main function to check file
}, 2000);


/*update json*/
function update(newData, file) {
  fs.readFile(file, function(err, data) {
    if (err) {
      //throw err;
      console.log('something went wrong, check if file exists');
    } else { 
      var allItems = JSON.parse(data);
      allItems.push(newData);
      fs.writeFile(file, JSON.stringify(allItems), function (err) {
        if (err) {
          //throw err;
          console.log('can\'t write new data');
        } else {
          var newItem = allItems.slice(-1)[0];
          console.log('new item successfully added: '+ newItem.name + ' - ' + newItem.date);
          //res.send('new item successfully added and is '+ newItem.name + ' - ' + newItem.date);
        } 
      });
    }
  });
}


/*check json*/
function check(date, file) {
  var day = date.getDate();
  var monthRaw = date.getMonth() + 1;
  var monthFormat = monthRaw < 10 ? '0' + monthRaw : monthRaw;
  var currentDate = day + '.' + monthFormat;
  console.log(currentDate);
  
  fs.readFile(file, function(err, data) {
    if (err) {
      //throw err;
       console.log('something went wrong, check if file exists');
    } else {
      var allItems = JSON.parse(data);
      allItems.forEach(function(item, index) {
        var politeDate = item.date.slice(0, -5);
        if(politeDate == currentDate) {
          console.log('today is ' + item.name + '\'s birthday: ' + item.date);
        }
      });
      //res.send(curItems);  
    }
  });
}