
var express = require('express');
var path = require('path');
var fs= require('fs');
var app = express();
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//Here goes your code

app.use(session({
  names:"",
  secret:'soso'
}));




app.get('/', function(req, res) {
  res.render('login' );
});

app.get('/registration', function(req, res) {
  res.render('registration' );
});

app.get('/horror', function(req, res) {
  res.render('horror');
});

app.get('/action', function(req, res) {
  res.render('action');
});
app.get('/conjuring', function(req, res) {
  res.render('conjuring');
});
app.get('/darkknight', function(req, res) {
  res.render('darkknight');
});
app.get('/drama', function(req, res) {
  res.render('drama');
});
app.get('/fightclub', function(req, res) {
  res.render('fightclub');
});
app.get('/godfather', function(req, res) {
  res.render('godfather');
});
app.get('/godfather2', function(req, res) {
  res.render('godfather2');
});
app.get('/home', function(req, res) {
  res.render('home');
});
app.get('/index', function(req, res) {
  res.render('index');
});
app.get('/scream', function(req, res) {
  res.render('scream');
});
app.get('/searchresults', function(req, res) {
  res.render('searchresults');
});

app.get('/watchlist', function(req, res) {
  var a=loadwatchlist(req.session.names);
 var results=[]
  for(var i=0;i<a.length;i++){
    results.push("<br>"+`<a href=${"/"+a[i]}>${a[i]}</a>`);
  }
  res.render('watchlist',{userwatchlist: results});
});



app.post('/scream', function(req, res) {
  var curwatchlist = loadwatchlist(req.session.names);
  var flag=true;
  for(var i=0; i<curwatchlist.length;i++){
    if(curwatchlist[i]=="scream"){
      flag = false;
    }
  }
  if(!flag){
    res.send("This movie is already in your watchlist");
  }
  else{
    addwatchlist("scream",req.session.names);
  }

});
app.post('/conjuring', function(req, res) {
  var curwatchlist = loadwatchlist(req.session.names);
  var flag=true;
  for(var i=0; i<curwatchlist.length;i++){
    if(curwatchlist[i]=="conjuring"){
      flag = false;
    }
  }
  if(!flag){
    res.send("This movie is already in your watchlist");
  }
  else{
    addwatchlist("conjuring",req.session.names);
  }
});
app.post('/darkknight', function(req, res) {
  var curwatchlist = loadwatchlist(req.session.names);
  var flag=true;
  for(var i=0; i<curwatchlist.length;i++){
    if(curwatchlist[i]=="darkknight"){
      flag = false;
    }
  }
  if(!flag){
    res.send("This movie is already in your watchlist");
  }
  else{
    addwatchlist("darkknight",req.session.names);
  }
});
app.post('/fightclub', function(req, res) {
  var curwatchlist = loadwatchlist(req.session.names);
  var flag=true;
  for(var i=0; i<curwatchlist.length;i++){
    if(curwatchlist[i]=="fightclub"){
      flag = false;
    }
  }
  if(!flag){
    res.send("This movie is already in your watchlist");
  }
  else{
    addwatchlist("fightclub",req.session.names);
  }
});
app.post('/godfather', function(req, res) {
  var curwatchlist = loadwatchlist(req.session.names);
  var flag=true;
  for(var i=0; i<curwatchlist.length;i++){
    if(curwatchlist[i]=="godfather"){
      flag = false;
    }
  }
  if(!flag){
    res.send("This movie is already in your watchlist");
  }
  else{
    addwatchlist("godfather",req.session.names);
  }
});
app.post('/godfather2', function(req, res) {
  var curwatchlist = loadwatchlist(req.session.names);
  var flag=true;
  for(var i=0; i<curwatchlist.length;i++){
    if(curwatchlist[i]=="godfather2"){
      flag = false;
    }
  }
  if(!flag){
    res.send("This movie is already in your watchlist");
  }
  else{
    addwatchlist("godfather2",req.session.names);
  }
});


var movies = ['Godfather', 'Godfather2', 'conjuring', 'fightclub', 'scream','darkknight'];
app.post('/search', function(req,res){
  var s = req.body.Search;

  var results=[];

  for(var i =0;i<movies.length;i++){

    if((movies[i].toLowerCase()).includes(s)){
     

     results.push("<br>"+`<a href=${"/"+movies[i]}>${movies[i]}</a>`)
    }
  }
  if (results.length==0){
    results.push('Movie not found')
  res.render("searchresults",{res:results });
  }
  else{
    res.render("searchresults",{res: results });
  }
});


app.post('/',function(req,res){
  var u=req.body.username;
  var p=req.body.password;
  var o={
    name: u,
    pass: p
    
  };
  var flag = false;
  var a = JSON.parse(fs.readFileSync("users.json"));
 
  for(var i=0;i<a.length;i++){
    if(a[i].name==o.name & a[i].pass==o.pass){
      flag=true;
    }
    if(a[i].name==o.name & a[i].pass!=o.pass){
      flag=true;
    }
  }
  if(!flag){
    res.render('loginUsernameNotExist');
  }


  for(var i=0;i<a.length;i++){
    
    if(a[i].name==o.name & a[i].pass!=o.pass){
      flag=true;
      res.render('loginWrongPass');
      //res.send("wrong pass")
      break;
    }
    if(a[i].name==o.name & a[i].pass==o.pass){
      flag=true;
      req.session.names=o.name;
      res.render('home');      
      break;
    }
  }
  

});

let loadwatchlist = function(x){
  var a = JSON.parse(fs.readFileSync("users.json"));
  for(var i=0;i<a.length;i++){
    if(a[i].name==x){
      return a[i].wishlist;
    }
}
}

let addwatchlist = function(movie,x){
  var a = JSON.parse(fs.readFileSync("users.json"));
 
  for(var i=0;i<a.length;i++){
    if(a[i].name==x){
      a[i].wishlist.push(movie);
    }
  fs.writeFileSync('users.json', JSON.stringify(a));
}
}

app.get('/string',function(req,res){
  res.send(req.session.names);
});

app.post('/register', function(req,res){
var username1=req.body.username;
var password1=req.body.password;
var obj={
  name: username1,
  pass: password1,
  wishlist:[]
};
var arrayOfStrings= fs.readFileSync("users.json");
var arrayOfObjects= JSON.parse(arrayOfStrings);
var flag = true;

for(var i=0;i<arrayOfObjects.length;i++){
  if(arrayOfObjects[i].name==obj.name){
    flag=false;
    break;
  }
}
if(flag==true){
  
  res.render('registrationsucc');
  arrayOfObjects.push(obj);
}
else{
  res.render('registrationwrong');
  //res.send("USERNAME IS ALREADY TAKEN");
}
var stringed = JSON.stringify(arrayOfObjects);
fs.writeFileSync("users.json",stringed);
});


if(process.env.PORT){
  app.listen(process.env.PORT);
}
else{
  app.listen(3000);
}
//Here your code ends
module.exports = app;
